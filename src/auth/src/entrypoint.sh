#! /bin/ash

# Ash is the default shell in Alpine Linux

echo "Apply database migrations" 
python manage.py migrate

exec "$@"