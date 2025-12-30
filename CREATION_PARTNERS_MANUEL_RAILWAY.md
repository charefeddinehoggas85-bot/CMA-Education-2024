# 🔧 CRÉATION MANUELLE CONTENT TYPE PARTNERS - RAILWAY

## 🎯 **PROBLÈME ACTUEL**
- Erreur 404 sur `/api/partners` 
- Content Type "partners" manquant dans Railway
- Création automatique via API échouée (401)

## 📋 **SOLUTION : CRÉATION MANUELLE**

### **ÉTAPE 1 : Accéder à Railway Admin**
1. **Ouvrir :** `https://cma-education-strapi-production.up.railway.app/admin`
2. **Se connecter** avec vos identifiants Railway

### **ÉTAPE 2 : Créer le Content Type**
1. **Aller à :** Content-Type Builder (dans le menu de gauche)
2. **Cliquer :** "Create new collection type"
3. **Remplir :**
   - **Display name :** `Partners`
   - **API ID (singular) :** `partner`
   - **API ID (plural) :** `partners`
4. **Cliquer :** "Continue"

### **ÉTAPE 3 : Ajouter les champs**

#### **Champ 1 : nom**
- **Type :** Text
- **Name :** `nom`
- **Advanced Settings :**
  - ✅ Required field
- **Cliquer :** "Add another field"

#### **Champ 2 : logo**
- **Type :** Media
- **Name :** `logo`
- **Advanced Settings :**
  - **Type :** Single media
  - **Allowed types :** Images only
- **Cliquer :** "Add another field"

#### **Champ 3 : description**
- **Type :** Text
- **Name :** `description`
- **Cliquer :** "Add another field"

#### **Champ 4 : secteur**
- **Type :** Text
- **Name :** `secteur`
- **Cliquer :** "Add another field"

#### **Champ 5 : ordre**
- **Type :** Number
- **Name :** `ordre`
- **Number format :** integer
- **Advanced Settings :**
  - **Default value :** `1`
- **Cliquer :** "Add another field"

#### **Champ 6 : featured**
- **Type :** Boolean
- **Name :** `featured`
- **Advanced Settings :**
  - **Default value :** `true`
- **Cliquer :** "Add another field"

#### **Champ 7 : url (optionnel)**
- **Type :** Text
- **Name :** `url`

### **ÉTAPE 4 : Sauvegarder**
1. **Cliquer :** "Finish"
2. **Attendre** le redémarrage de Strapi (30-60 secondes)

### **ÉTAPE 5 : Configurer les permissions**
1. **Aller à :** Settings → Roles and Permissions → Public
2. **Trouver :** Partners dans la liste
3. **Cocher :**
   - ✅ `find`
   - ✅ `findOne`
4. **Cliquer :** "Save"

## ✅ **VÉRIFICATION**

Après création, tester l'API :
```
https://cma-education-strapi-production.up.railway.app/api/partners
```

**Résultat attendu :** `{"data":[],"meta":{"pagination":{"page":1,"pageSize":25,"pageCount":0,"total":0}}}`

## 🚀 **ÉTAPES SUIVANTES**

Une fois le Content Type créé :

1. **Créer des partenaires d'exemple** via Railway Admin
2. **Ou** relancer le script de création automatique
3. **Tester** que l'erreur 404 disparaît du frontend

## 📞 **BESOIN D'AIDE ?**

Si problème lors de la création :
1. Vérifier que vous êtes bien connecté en tant qu'admin
2. Rafraîchir la page Railway Admin
3. Réessayer la création

---

**⏱️ TEMPS ESTIMÉ :** 5-10 minutes
**🎯 OBJECTIF :** Éliminer l'erreur 404 sur `/api/partners`