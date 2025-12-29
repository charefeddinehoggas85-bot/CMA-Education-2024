-- Script de création de la base de données CMA Education
-- À exécuter en tant que superuser PostgreSQL

-- Créer l'utilisateur
CREATE USER cma_user WITH PASSWORD 'cma_secure_2024';

-- Créer la base de données
CREATE DATABASE cma_cms OWNER cma_user;

-- Accorder tous les privilèges
GRANT ALL PRIVILEGES ON DATABASE cma_cms TO cma_user;

-- Se connecter à la base cma_cms et accorder les privilèges sur le schéma
\c cma_cms;
GRANT ALL ON SCHEMA public TO cma_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cma_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cma_user;

-- Afficher les informations de connexion
\echo 'Base de données créée avec succès !'
\echo 'Host: localhost'
\echo 'Port: 5432'
\echo 'Database: cma_cms'
\echo 'Username: cma_user'
\echo 'Password: cma_secure_2024'