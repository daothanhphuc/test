from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine import URL

# create database with fastapi
connection_url = URL.create(
    "mssql+pyodbc",
    username="sa",
    password="23456789",
    host="127.0.0.1",
    port=1433,
    database="env_mag",
    query={
        "driver": "ODBC Driver 18 for SQL Server",
        "TrustServerCertificate": "yes",
    }
)

engine = create_engine(
    connection_url, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """
    Dung de mo ket noi den SQL Server va thuc hien truy van
    Sau khi truy van tu dong dong ket noi den database
    - **nothing** khong co tham so yeu cau
    `get_db` la ten ham
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


