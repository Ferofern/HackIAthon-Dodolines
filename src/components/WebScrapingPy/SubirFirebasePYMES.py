import firebase_admin
from firebase_admin import credentials, firestore
import pandas as pd
import os


def inicializar_firebase(ruta_credenciales):
    # Inicializa la app Firebase Admin con las credenciales JSON
    cred = credentials.Certificate(ruta_credenciales)
    firebase_admin.initialize_app(cred)
    return firestore.client()


def subir_datos_firestore(df, coleccion, ruta_credenciales):
    # Obtiene el cliente de Firestore
    db = inicializar_firebase(ruta_credenciales)

    batch = db.batch()
    for idx, fila in df.iterrows():
        doc_id = str(fila['ruc'])  # Usa RUC como ID del documento
        doc_ref = db.collection(coleccion).document(doc_id)
        batch.set(doc_ref, fila.to_dict())

        # Para evitar superar límite de 500 escrituras por batch
        if (idx + 1) % 500 == 0:
            batch.commit()
            batch = db.batch()

    # Commitea el último batch pendiente
    batch.commit()
    print(f"✅ Subidos {len(df)} documentos a la colección '{coleccion}'.")


if __name__ == "__main__":
    folder = r"C:/Users/ferof/OneDrive/Documents/RaulMATES"
    archivo_csv = os.path.join(folder, "pymes_filtradas.csv")
    ruta_credenciales = r"C:/Users/ferof/Downloads/hackiathon-d1f93-firebase-adminsdk-fbsvc-762d69f3c0.json"

    # Carga CSV de PYMEs filtradas
    df_pymes = pd.read_csv(archivo_csv, encoding="utf-8")

    # Sube los datos a Firestore en la colección "pymes_2023_2024"
    subir_datos_firestore(df_pymes, "pymes_2023_2024", ruta_credenciales)
