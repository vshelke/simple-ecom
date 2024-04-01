#!/bin/bash

echo "Migrating databse changes..."
python3 manage.py migrate
echo "Starting gunicorn workers..."
gunicorn simple_ecom.wsgi:application --bind :45679 --workers=3 --timeout=420 --keep-alive=420
