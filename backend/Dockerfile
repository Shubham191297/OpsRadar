FROM python:3.11

EXPOSE 5000

WORKDIR /app

COPY requirements.txt . 
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

ENTRYPOINT ["python3", "app.py"]