# 👨‍💼 Guide Administrateur - Gestion des Formations Strapi

## 🎯 Vue d'ensemble

Ce guide explique comment gérer les formations importées via Strapi et optimiser leur affichage dans le carousel artistique moderne.

## 📋 Table des matières

1. [Accès à l'interface admin](#accès-à-linterface-admin)
2. [Gestion des catégories](#gestion-des-catégories)
3. [Gestion des formations](#gestion-des-formations)
4. [Gestion des images](#gestion-des-images)
5. [Permissions et sécurité](#permissions-et-sécurité)
6. [Optimisation SEO](#optimisation-seo)
7. [Maintenance et sauvegarde](#maintenance-et-sauvegarde)

## 🔐 Accès à l'interface admin

### URL d'administration
```
https://cma-education-strapi-production.up.railway.app/admin
```

### Connexion
1. Utilisez vos identifiants administrateur
2. Accédez au tableau de bord principal
3. Naviguez vers "Content Manager" dans le menu latéral

## 🏷️ Gestion des catégories

### Accès aux catégories
1. **Content Manager** → **Categories**
2. Vue d'ensemble de toutes les catégories

### Catégories par défaut
| Nom | Slug | Description |
|-----|------|-------------|
| Alternance | `alternance` | Formations en alternance |
| Reconversion Professionnelle | `reconversion` | Formations pour reconversion |
| VAE | `vae` | Validation des Acquis de l'Expérience |
| Formations Entreprises | `entreprise` | Solutions sur mesure entreprises |

### Créer une nouvelle catégorie
1. Cliquer sur **"Create new entry"**
2. Remplir les champs :
   - **Name** : Nom affiché (ex: "Formations Courtes")
   - **Slug** : URL-friendly (ex: "formations-courtes")
   - **Description** : Description courte
3. **Publier** la catégorie

### Modifier une catégorie
1. Cliquer sur la catégorie à modifier
2. Éditer les champs nécessaires
3. **Sauvegarder** les modifications

## 📚 Gestion des formations

### Accès aux formations
1. **Content Manager** → **Formations**
2. Vue liste avec filtres et recherche

### Structure d'une formation

#### Informations générales
- **Title** : Titre de la formation
- **Slug** : URL unique (généré automatiquement)
- **Level** : Niveau de qualification
- **Category** : Catégorie associée

#### Certification
- **RNCP** : Code RNCP (ex: RNCP35503)
- **RNCP URL** : Lien vers France Compétences

#### Descriptions
- **Short Description** : Résumé court (carousel)
- **Full Description** : Description complète (page détail)

#### Modalités
- **Duration** : Durée de la formation
- **Rhythm** : Rythme (alternance, temps plein...)
- **Mode** : Modalité (présentiel, distanciel...)
- **Price** : Tarif ou financement

#### Contenu pédagogique
- **Objectives** : Liste des objectifs (JSON array)
- **Opportunities** : Débouchés professionnels (JSON array)
- **Prerequisites** : Prérequis (JSON array)

#### Statistiques
- **Success Rate** : Taux de réussite (%)
- **Insertion Rate** : Taux d'insertion (%)

#### Média
- **Image** : Image principale de la formation

### Créer une nouvelle formation

#### 1. Informations de base
```
Title: "Nouvelle Formation BTP"
Slug: "nouvelle-formation-btp" (auto-généré)
Level: "Niveau 5 (BAC+2)"
Category: Sélectionner dans la liste
```

#### 2. Certification
```
RNCP: "RNCP12345"
RNCP URL: "https://www.francecompetences.fr/recherche/rncp/12345/"
```

#### 3. Descriptions
```
Short Description: "Formation courte et percutante pour le carousel"
Full Description: "Description détaillée avec tous les éléments..."
```

#### 4. Modalités
```
Duration: "1 an"
Rhythm: "3 semaines entreprise / 1 semaine centre"
Mode: "Alternance"
Price: "Prise en charge OPCO"
```

#### 5. Objectifs (format JSON)
```json
[
  "Premier objectif pédagogique",
  "Deuxième objectif pédagogique",
  "Troisième objectif pédagogique"
]
```

#### 6. Débouchés (format JSON)
```json
[
  "Premier métier accessible",
  "Deuxième métier accessible",
  "Troisième métier accessible"
]
```

#### 7. Prérequis (format JSON)
```json
[
  "Premier prérequis",
  "Deuxième prérequis"
]
```

#### 8. Statistiques
```
Success Rate: 95
Insertion Rate: 98
```

### Modifier une formation existante
1. Cliquer sur la formation dans la liste
2. Éditer les champs nécessaires
3. **Sauvegarder et publier**

### Dupliquer une formation
1. Ouvrir la formation à dupliquer
2. Copier le contenu
3. Créer une nouvelle entrée
4. Coller et adapter le contenu

## 📸 Gestion des images

### Formats recommandés
- **Format** : JPG, PNG, WebP
- **Dimensions** : 800x600 pixels minimum
- **Poids** : < 500KB pour de bonnes performances
- **Ratio** : 4:3 (optimal pour le carousel)

### Upload d'images
1. **Media Library** → **Upload**
2. Glisser-déposer ou sélectionner les fichiers
3. Ajouter des métadonnées :
   - **Alternative text** : Description pour l'accessibilité
   - **Caption** : Légende si nécessaire

### Associer une image à une formation
1. Éditer la formation
2. Champ **Image** → **Select media**
3. Choisir l'image dans la bibliothèque
4. **Sauvegarder**

### Optimisation des images
- Utiliser des outils de compression (TinyPNG, ImageOptim)
- Privilégier le format WebP pour de meilleures performances
- Créer des versions responsive si nécessaire

## 🔐 Permissions et sécurité

### Rôles recommandés

#### Super Admin
- Accès complet à toutes les fonctionnalités
- Gestion des utilisateurs et permissions
- Configuration système

#### Editor
- Création/modification des formations
- Gestion des catégories
- Upload d'images
- Publication de contenu

#### Author
- Création de formations (brouillon uniquement)
- Upload d'images
- Pas de publication directe

### Configuration des permissions API

#### Public (Frontend)
```
Formations:
✅ find (lecture liste)
✅ findOne (lecture détail)
❌ create, update, delete

Categories:
✅ find (lecture liste)
✅ findOne (lecture détail)
❌ create, update, delete

Upload:
✅ find (lecture images)
❌ create, update, delete
```

#### Authenticated (Admin)
```
Formations:
✅ find, findOne, create, update, delete

Categories:
✅ find, findOne, create, update, delete

Upload:
✅ find, create, update, delete
```

### Sécurisation
1. **Mots de passe forts** pour tous les comptes admin
2. **Authentification à deux facteurs** si disponible
3. **Sauvegarde régulière** de la base de données
4. **Mise à jour** régulière de Strapi

## 🔍 Optimisation SEO

### Métadonnées des formations
- **Title** : Optimisé avec mots-clés
- **Slug** : URL-friendly et descriptive
- **Short Description** : Meta description naturelle

### Images SEO
- **Alt text** : Description précise pour l'accessibilité
- **Noms de fichiers** : Descriptifs (ex: formation-charge-affaires-batiment.jpg)
- **Compression** : Optimisées pour le web

### Structure des données
Les formations sont automatiquement structurées pour le SEO :
```json
{
  "@type": "Course",
  "name": "Titre de la formation",
  "description": "Description courte",
  "provider": "Construction Management Academy",
  "courseCode": "RNCP35503"
}
```

## 🛠️ Maintenance et sauvegarde

### Sauvegarde régulière
1. **Base de données** : Export SQL hebdomadaire
2. **Fichiers média** : Synchronisation cloud
3. **Configuration** : Export des content types

### Commandes utiles
```bash
# Export de la base de données
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Sauvegarde des médias
rsync -av uploads/ backup/uploads/

# Export des content types
npm run strapi export
```

### Monitoring
- **Performances** : Temps de réponse API
- **Erreurs** : Logs d'erreurs Strapi
- **Utilisation** : Espace disque et mémoire

### Mise à jour
1. **Strapi** : Suivre les versions LTS
2. **Plugins** : Maintenir à jour
3. **Dépendances** : Audit de sécurité régulier

## 📊 Analytics et suivi

### Métriques importantes
- **Nombre de formations** par catégorie
- **Taux de consultation** des formations
- **Performances** du carousel
- **Conversions** vers les pages détail

### Outils recommandés
- **Google Analytics** : Suivi des pages formations
- **Strapi Analytics** : Utilisation de l'admin
- **Lighthouse** : Performance et SEO

## 🚀 Bonnes pratiques

### Contenu
1. **Cohérence** : Style et ton uniformes
2. **Actualisation** : Mise à jour régulière des informations
3. **Qualité** : Relecture et validation
4. **Accessibilité** : Alt text et structure claire

### Technique
1. **Performance** : Images optimisées
2. **SEO** : Métadonnées complètes
3. **Sécurité** : Permissions appropriées
4. **Sauvegarde** : Stratégie de backup

### Workflow
1. **Brouillon** → **Relecture** → **Publication**
2. **Tests** sur environnement de développement
3. **Validation** avant mise en production
4. **Suivi** des performances post-publication

## 🆘 Dépannage

### Problèmes courants

#### Formation non visible sur le frontend
1. Vérifier que la formation est **publiée**
2. Contrôler les **permissions API**
3. Vider le **cache** si nécessaire

#### Image non affichée
1. Vérifier l'**upload** de l'image
2. Contrôler les **permissions** de lecture
3. Tester l'**URL** de l'image directement

#### Erreur de sauvegarde
1. Vérifier les **champs obligatoires**
2. Contrôler le **format JSON** des arrays
3. Vérifier les **permissions** d'écriture

### Support
- **Documentation Strapi** : https://docs.strapi.io
- **Communauté** : Forum et Discord Strapi
- **Logs** : Consulter les logs serveur pour diagnostiquer

## 🎯 Résumé des actions clés

✅ **Accès admin** : Interface Strapi configurée  
✅ **Gestion catégories** : 4 catégories principales  
✅ **Gestion formations** : Structure complète définie  
✅ **Images optimisées** : Formats et dimensions recommandés  
✅ **Permissions sécurisées** : Accès contrôlé par rôle  
✅ **SEO optimisé** : Métadonnées et structure  
✅ **Maintenance planifiée** : Sauvegarde et monitoring  

L'interface d'administration est maintenant prête pour une gestion efficace et professionnelle des formations.
