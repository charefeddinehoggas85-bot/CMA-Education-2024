# 📤 Guide Upload GitHub - CMA Education

## 🎯 Préparation avant upload

### 1. Nettoyer le projet
```bash
# Supprimer les fichiers temporaires
npm run build
```

### 2. Vérifier le .gitignore
Assurez-vous que ces éléments sont ignorés :
```
# Dependencies
node_modules/
cms-cma/node_modules/

# Build outputs
.next/
cms-cma/build/
cms-cma/.tmp/

# Environment variables
.env.local
.env.production
cms-cma/.env

# Logs
*.log
npm-debug.log*

# Cache
.cache/
cms-cma/.cache/

# Database
cms-cma/.tmp/
cms-cma/data.db*

# OS
.DS_Store
Thumbs.db
```

### 3. Créer un README.md principal