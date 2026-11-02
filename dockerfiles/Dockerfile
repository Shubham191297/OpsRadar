FROM postgres:latest

EXPOSE 5432

# Perform pgsql dump using - pg_dump -U postgres -d opsradar -f opsradar.pgsql

RUN apt-get update && apt-get install -y bash dos2unix
RUN useradd -m -s /bin/bash shubham && echo "shubham:1234" | chpasswd

COPY opsradar.pgsql /opsradar.pgsql
COPY init-db.sh /docker-entrypoint-initdb.d/init-db.sh

RUN dos2unix /docker-entrypoint-initdb.d/init-db.sh && chmod +x /docker-entrypoint-initdb.d/init-db.sh

# This ensures Postgres listens on all IPs from the start
CMD ["postgres", "-c", "listen_addresses=*"]