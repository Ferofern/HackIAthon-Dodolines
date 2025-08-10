import os
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import ssl

class TLSAdapter(HTTPAdapter):
    def init_poolmanager(self, *args, **kwargs):
        ctx = ssl.create_default_context()
        ctx.set_ciphers('DEFAULT:@SECLEVEL=1')
        kwargs['ssl_context'] = ctx
        return super().init_poolmanager(*args, **kwargs)

def download_files(output_folder):
    urls = {
        "bi_ranking.csv": "https://appscvsmovil.supercias.gob.ec/ranking/recursos/bi_ranking.csv",
        "bi_compania.csv": "https://appscvsmovil.supercias.gob.ec/ranking/recursos/bi_compania.csv"
    }

    os.makedirs(output_folder, exist_ok=True)

    session = requests.Session()
    retries = Retry(total=3, backoff_factor=1, status_forcelist=[500,502,503,504])
    session.mount("https://", TLSAdapter(max_retries=retries))

    for filename, url in urls.items():
        filepath = os.path.join(output_folder, filename)
        if not os.path.exists(filepath):
            print(f"Descargando {filename}...")
            try:
                response = session.get(url, stream=True, timeout=30)
                response.raise_for_status()
                with open(filepath, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"✅ {filename} descargado con éxito.")
            except requests.exceptions.RequestException as e:
                print(f"❌ Error al descargar {filename}: {e}")
        else:
            print(f"⏩ {filename} ya existe, no se descargará.")

if __name__ == "__main__":
    folder = r"C:/Users/ferof/OneDrive/Documents/RaulMATES"
    download_files(folder)
