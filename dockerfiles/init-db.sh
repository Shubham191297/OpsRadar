set -e

echo "Waiting for Postgres to be ready..."
until pg_isready -U "$POSTGRES_USER" > /dev/null 2>&1; do
  sleep 1
done

echo "Importing opsradar.pgsql into database $POSTGRES_DB..."
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /opsradar.pgsql

echo "✅ Import done."