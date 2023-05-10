from datetime import datetime, timedelta
import random
from pymongo import MongoClient

# connessione al database MongoDB
client = MongoClient("mongodb://127.0.0.1:27017")
db = client["PonAgreed"]
collection = db["sensors"]

# definizione dei parametri del sensore
sensor_id = "sensor_001"
sensor_name = "Sensore di prova"
sensor_location = {"type": "Point", "coordinates": [45.4567, 9.1234]}

# definizione dell'intervallo di tempo
start_date = datetime(2023, 4, 1)
end_date = datetime(2023, 4, 30)

# generazione dei dati fake del sensore
current_date = start_date
while current_date <= end_date:
    for i in range(288): # 288 letture, una ogni 5 minuti
        timestamp = current_date + timedelta(minutes=5*i)
        temperature = random.uniform(20.0, 25.0)
        pressure = random.uniform(1012.0, 1015.0)
        humidity = random.uniform(40.0, 60.0)

        # creazione del documento da inserire nella collezione
        document = {
            "timestamp": timestamp,
            "temperature": temperature,
            "pressure": pressure,
            "humidity": humidity,
            "metadata": {
                "sensor_id": sensor_id,
                "name": sensor_name,
                "location": sensor_location
            }
        }

        # inserimento del documento nella collezione
        collection.insert_one(document)

    current_date += timedelta(days=1)