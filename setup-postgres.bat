@echo off
echo 🗄️ Configuration de la base de données PostgreSQL pour CMA Education
echo.

echo 📋 Étapes à suivre :
echo 1. Ouvrez pgAdmin ou psql
echo 2. Connectez-vous en tant que superuser (postgres)
echo 3. Exécutez les commandes suivantes :
echo.

echo -- Créer l'utilisateur
echo CREATE USER cma_user WITH PASSWORD 'cma_secure_2024';
echo.
echo -- Créer la base de données
echo CREATE DATABASE cma_cms OWNER cma_user;
echo.
echo -- Accorder les privilèges
echo GRANT ALL PRIVILEGES ON DATABASE cma_cms TO cma_user;
echo.

echo 🔧 Ou exécutez directement :
echo psql -U postgres -c "CREATE USER cma_user WITH PASSWORD 'cma_secure_2024';"
echo psql -U postgres -c "CREATE DATABASE cma_cms OWNER cma_user;"
echo psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE cma_cms TO cma_user;"
echo.

echo ✅ Une fois terminé, lancez : npm run develop
echo.
pause