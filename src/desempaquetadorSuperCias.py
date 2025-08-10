import pandas as pd
import os

def load_and_merge_data(folder):
    ranking_path = os.path.join(folder, "bi_ranking.csv")
    compania_path = os.path.join(folder, "bi_compania.csv")

    df_ranking = pd.read_csv(ranking_path, encoding="utf-8")
    df_compania = pd.read_csv(compania_path, encoding="utf-8")

    # Filtrar años 2023 y 2024
    df_ranking_filtered = df_ranking[df_ranking["anio"].isin([2023, 2024])]

    # Merge con compania por expediente
    df_merged = pd.merge(df_ranking_filtered, df_compania, on="expediente", how="inner")

    return df_merged

if __name__ == "__main__":
    folder = r"C:/Users/ferof/OneDrive/Documents/RaulMATES"
    df = load_and_merge_data(folder)
    print(f"Datos combinados años 2023 y 2024: {df.shape[0]} filas")
    print(df.head())
    # Guardar archivo combinado para uso posterior
    df.to_csv(os.path.join(folder, "datos_combinados_2023_2024.csv"), index=False)
