import pandas as pd
import os

def filtrar_pymes(df):
    # Filtro PYME según ingresos y empleados
    cond_micro = (df["ingresos_ventas"] < 300000) & (df["n_empleados"] <= 9)
    cond_peque = (df["ingresos_ventas"].between(300001, 1000000)) & (df["n_empleados"].between(10, 49))
    cond_medianaA = (df["ingresos_ventas"].between(1000001, 2000000)) & (df["n_empleados"].between(50, 99))
    cond_medianaB = (df["ingresos_ventas"].between(2000001, 5000000)) & (df["n_empleados"].between(100, 199))

    df_pymes = df[cond_micro | cond_peque | cond_medianaA | cond_medianaB].copy()

    # Columnas relevantes para análisis financiero en español
    columnas_relevantes = [
        "anio",
        "expediente",
        "ruc",
        "nombre",
        "ingresos_ventas",     # Ventas
        "activos",             # Activos totales
        "patrimonio",          # Patrimonio neto
        "utilidad_neta",       # Utilidad neta (flujo caja)
        "impuesto_renta",      # Impuesto a la renta
        "n_empleados",         # Número de empleados
        "liquidez_corriente",  # Liquidez corriente
        "prueba_acida",        # Prueba ácida
        "deuda_total",         # Deuda total
        "gastos_financieros",  # Gastos financieros (intereses)
        "margen_bruto",        # Margen bruto
        "rent_neta_ventas",    # Rentabilidad neta sobre ventas
        "roe",                 # Retorno sobre patrimonio
        "roa"                  # Retorno sobre activos
    ]

    # Filtrar columnas que existan en el DataFrame para evitar errores
    columnas_finales = [col for col in columnas_relevantes if col in df_pymes.columns]

    return df_pymes[columnas_finales]

if __name__ == "__main__":
    folder = r"C:/Users/ferof/OneDrive/Documents/RaulMATES"
    df = pd.read_csv(os.path.join(folder, "datos_combinados_2023_2024.csv"), encoding="utf-8")
    df_pymes = filtrar_pymes(df)
    print(f"Pymes filtradas: {df_pymes.shape[0]} filas")
    print(df_pymes.head())

    # Guardar para siguiente paso (scoring / firebase)
    df_pymes.to_csv(os.path.join(folder, "C:/Users/ferof/OneDrive/Documents/RaulMATES/pymes_filtradas.csv"), index=False)

