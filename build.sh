#!/usr/bin/env bash
# Exit immediately on error
set -o errexit

echo "==> Instalando dependencias de Python..."
pip install --upgrade pip
pip install -r backend/requirements.txt

echo "==> Ejecutando migraciones de base de datos..."
python backend/manage.py migrate --noinput

echo "==> Sembrando datos iniciales de EZ Techlabs..."
python backend/manage.py seed_ez_data

echo "==> Asegurando usuario administrador (Ingeniero01*)..."
python backend/manage.py create_admin_user

echo "==> Recolectando archivos estáticos para WhiteNoise..."
python backend/manage.py collectstatic --noinput

echo "==> ¡Build de Render completado exitosamente!"
