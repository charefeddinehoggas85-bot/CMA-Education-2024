# 🚀 GUIDE COMPLET - MIGRATION LOCALHOST VERS NEON

Ce guide vous accompagne dans la migration complète de votre base de données PostgreSQL locale vers Neon PostgreSQL, sans perdre aucune donnée.

## 📋 PRÉREQUIS

### 1. Outils requis
- Node.js (v16+)
- PostgreSQL local fonctionnel
- Compte Neon avec base de données créée
- pg_dump installé (inclus avec PostgreSQL)

### 2. Informations nécessaires
- URL de connexion Neon : `postgresql://username:password@host/database?sslmode=require`
- Accès à votre base locale (par défaut : localhost:5432)
- Token Strapi pour les tests

## 🔄 PROCESSUS DE MIGRATION

### ÉTAPE 1 : Configuration et vérification

```bash
# 1. Configurer la migration
node scripts/setup-neon-migration.js

# 2. Vérification rapide (optionnel)
node scripts/setup-neon-migration.js --check
```

**Ce que fait cette étape :**
- Demande votre URL de connexion Neon
- Teste les connexions locale et Neon
- Analyse les données à migrer
- Crée le fichier `.env.migration`

### ÉTAPE 2 : Sauvegarde de sécurité

```bash
# Créer une sauvegarde complète avant migration
node scripts/backup-before-migration.js
```

**Ce que fait cette étape :**
- Crée un dump SQL complet
- Génère une sauvegarde JSON avec structure
- Liste toutes les tables et leurs tailles
- Sauvegarde dans `backups/migration/`

### ÉTAPE 3 : Migration complète

```bash
# Définir l'URL Neon (si pas déjà fait)
export DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Lancer la migration
node scripts/complete-database-migration-localhost-to-neon.js
```

**Ce que fait cette étape :**
- Connexion aux deux bases de données
- Migration table par table dans l'ordre des dépendances
- Gestion des relations et contraintes
- Réinitialisation des séquences
- Vérification automatique

### ÉTAPE 4 : Validation post-migration

```bash
# Valider la migration
node scripts/validate-migration-complete.js
```

**Ce que fait cette étape :**
- Compare les comptages de données
- Teste les APIs Strapi
- Valide l'intégrité des relations
- Teste les performances
- Génère un rapport complet

## 📊 STRUCTURE DES SCRIPTS

### 1. `setup-neon-migration.js`
- **Objectif** : Configuration initiale
- **Fonctions** :
  - Collecte des informations de connexion
  - Test de connectivité
  - Analyse préliminaire des données
  - Création du fichier de configuration

### 2. `backup-before-migration.js`
- **Objectif** : Sauvegarde de sécurité
- **Fonctions** :
  - Dump SQL complet avec pg_dump
  - Sauvegarde JSON structurée
  - Liste détaillée des tables
  - Résumé de sauvegarde

### 3. `complete-database-migration-localhost-to-neon.js`
- **Objectif** : Migration complète
- **Fonctions** :
  - Migration ordonnée des tables
  - Gestion des contraintes
  - Préservation des relations
  - Réinitialisation des séquences
  - Statistiques en temps réel

### 4. `validate-migration-complete.js`
- **Objectif** : Validation post-migration
- **Fonctions** :
  - Comparaison des données
  - Tests API Strapi
  - Validation de l'intégrité
  - Tests de performance
  - Rapport détaillé

## 🔧 CONFIGURATION

### Variables d'environnement requises

```bash
# URL de connexion Neon
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Configuration locale (optionnel - valeurs par défaut)
LOCAL_DATABASE_HOST=127.0.0.1
LOCAL_DATABASE_PORT=5432
LOCAL_DATABASE_NAME=cma_cms
LOCAL_DATABASE_USER=postgres
LOCAL_DATABASE_PASSWORD=root
```

### Ordre de migration des tables

Les tables sont migrées dans cet ordre pour respecter les dépendances :

1. **Tables système** : `i18n_locale`, `upload_folders`, `upload_files`
2. **Utilisateurs et permissions** : `users_permissions_*`, `admin_*`
3. **Tables de base** : `formation_categories`, `formateurs`, `partners`
4. **Tables avec relations** : `formations`, `testimonials`, `blog_articles`
5. **Tables de configuration** : `pages`, `site_settings`

## 📈 MONITORING ET LOGS

### Codes couleur des logs
- 🔵 **Bleu** : Informations générales
- 🟢 **Vert** : Succès
- 🟡 **Jaune** : Avertissements
- 🔴 **Rouge** : Erreurs
- 🟣 **Magenta** : Étapes importantes

### Statistiques affichées
- Nombre de tables traitées
- Enregistrements migrés
- Erreurs rencontrées
- Temps d'exécution
- Correspondance des données

## 🛠️ RÉSOLUTION DE PROBLÈMES

### Erreur de connexion Neon
```bash
❌ Erreur de connexion: connection to server failed
```
**Solutions :**
- Vérifiez votre URL de connexion
- Confirmez que la base Neon est active
- Vérifiez les paramètres SSL

### Erreur de connexion locale
```bash
❌ Erreur de connexion: ECONNREFUSED 127.0.0.1:5432
```
**Solutions :**
- Démarrez PostgreSQL local
- Vérifiez les paramètres de connexion
- Confirmez que la base `cma_cms` existe

### Erreurs de contraintes
```bash
⚠️ Erreur insertion ligne: duplicate key value
```
**Solutions :**
- Les contraintes sont temporairement désactivées
- Vérifiez les données dupliquées
- Relancez la migration si nécessaire

### Données manquantes après migration
```bash
❌ Table formations: Local=25, Neon=20
```
**Solutions :**
- Consultez les logs détaillés
- Vérifiez les erreurs d'insertion
- Relancez la migration pour les tables concernées

## 📁 FICHIERS GÉNÉRÉS

### Dossier `backups/migration/`
- `cma_cms_backup_YYYY-MM-DD.sql` : Dump SQL complet
- `cma_cms_backup_YYYY-MM-DD.json` : Sauvegarde JSON structurée
- `tables_list_YYYY-MM-DD.json` : Liste des tables avec statistiques
- `backup_summary_YYYY-MM-DD.json` : Résumé de la sauvegarde
- `validation_report_YYYY-MM-DD.json` : Rapport de validation

### Fichier `.env.migration`
Configuration générée automatiquement avec :
- URL de connexion Neon
- Paramètres de base locale
- Date de configuration

## ✅ CHECKLIST DE MIGRATION

### Avant la migration
- [ ] Base de données locale accessible
- [ ] Compte Neon configuré
- [ ] URL de connexion Neon obtenue
- [ ] Sauvegarde créée
- [ ] Scripts testés

### Pendant la migration
- [ ] Surveillance des logs
- [ ] Vérification des erreurs
- [ ] Monitoring des statistiques
- [ ] Patience (peut prendre du temps)

### Après la migration
- [ ] Validation exécutée
- [ ] Rapport de validation consulté
- [ ] Tests API réussis
- [ ] Données vérifiées
- [ ] Performance acceptable

## 🚨 SÉCURITÉ ET BONNES PRATIQUES

### Sauvegarde
- **Toujours** créer une sauvegarde avant migration
- Conserver les sauvegardes pendant au moins 30 jours
- Tester la restauration depuis la sauvegarde

### Données sensibles
- Les mots de passe sont masqués dans les logs
- Les tokens ne sont pas sauvegardés
- Utilisez des variables d'environnement

### Validation
- **Toujours** valider après migration
- Comparer les comptages de données
- Tester les fonctionnalités critiques

## 📞 SUPPORT

### En cas de problème
1. Consultez les logs détaillés
2. Vérifiez la section résolution de problèmes
3. Consultez les fichiers de sauvegarde
4. Testez les connexions individuellement

### Commandes de diagnostic
```bash
# Test connexion locale
psql -h 127.0.0.1 -U postgres -d cma_cms -c "SELECT COUNT(*) FROM formations;"

# Test connexion Neon
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM formations;"

# Vérification rapide
node scripts/setup-neon-migration.js --check
```

## 🎯 RÉSULTATS ATTENDUS

### Migration réussie
- ✅ Toutes les tables migrées
- ✅ Comptages de données identiques
- ✅ Relations préservées
- ✅ APIs Strapi fonctionnelles
- ✅ Performance acceptable

### Temps estimé
- **Petite base** (< 1000 enregistrements) : 2-5 minutes
- **Base moyenne** (1000-10000 enregistrements) : 5-15 minutes
- **Grande base** (> 10000 enregistrements) : 15-60 minutes

---

## 🚀 COMMANDES RAPIDES

```bash
# Migration complète en une fois
node scripts/setup-neon-migration.js && \
node scripts/backup-before-migration.js && \
export DATABASE_URL="votre-url-neon" && \
node scripts/complete-database-migration-localhost-to-neon.js && \
node scripts/validate-migration-complete.js
```

**Bonne migration ! 🎉**