from dotenv import load_dotenv
import os

load_dotenv()

POSTGRE_DB_USER = os.getenv("DB_USER","postgres")
POSTGRE_DB_PASSWORD = os.getenv("DB_PASSWORD","admin123")
POSTGRE_DB_NAME = os.getenv("DB_NAME","opsradar")

OPSRADAR_ALLOWED_ORIGINS = os.getenv("FRONTEND_URL", "http://localhost:3000,http://opsradar-react:80").split(",")
# OPSRADAR_FRONTEND_URL = OPSRADAR_ALLOWED_ORIGINS[0]
OPSRADAR_BASE_API_PATH = os.getenv("BASE_API_PATH","")
OPSRADAR_POSTGRE_URL = os.getenv("OPSRADAR_DB_URL", "opsradar-db")