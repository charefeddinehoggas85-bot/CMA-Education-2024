# 🔍 Guide de Réindexation Google - CMA Education

## Pourquoi Google affiche l'ancien site ?

Après un changement de DNS (WordPress → Vercel), Google garde en cache l'ancienne version du site pendant **quelques jours à quelques semaines**. C'est normal !

---

## ⚡ Actions Immédiates (5-10 minutes)

### 1. Google Search Console

1. Connectez-vous à [Google Search Console](https://search.google.com/search-console)
2. Si le site n'est pas encore ajouté, ajoutez-le avec la méthode DNS ou fichier HTML

### 2. Soumettre les Sitemaps

Dans Search Console > **Sitemaps** :
- Soumettez : `https://cma-education.com/sitemap.xml`
- Soumettez : `https://cma-education.com/sitemap-formations-btp.xml`

### 3. Demander l'indexation des pages clés

Dans Search Console > **Inspection d'URL** :

Entrez chaque URL et cliquez "Demander l'indexation" :

```
https://cma-education.com
https://cma-education.com/formations
https://cma-education.com/about
https://cma-education.com/contact
https://cma-education.com/formations/conducteur-travaux-batiment-alternance
https://cma-education.com/formations/charge-affaires-batiment-alternance
https://cma-education.com/formations/reconversion-btp
https://cma-education.com/formations/vae-btp
https://cma-education.com/blog
```

---

## 📊 Délais Estimés

| Action | Délai |
|--------|-------|
| Demande d'indexation manuelle | 24-48h |
| Mise à jour automatique Google | 1-4 semaines |
| Disparition complète ancien cache | 2-6 semaines |

---

## 🛠️ Vérifications Techniques

### Vos sitemaps sont accessibles :
- https://cma-education.com/sitemap.xml ✅
- https://cma-education.com/sitemap-formations-btp.xml ✅

### Votre robots.txt est configuré :
- https://cma-education.com/robots.txt ✅

⚠️ **IMPORTANT** : Après avoir poussé les modifications sur GitHub, les fichiers seront accessibles.

---

## 💡 Astuces pour Accélérer

### 1. Partager sur les réseaux sociaux
Chaque partage crée un "signal" pour Google que le contenu a changé.

### 2. Créer du nouveau contenu
Publiez un article de blog - Google indexe plus vite les sites actifs.

### 3. Backlinks
Si vous avez des partenaires, demandez-leur de mettre à jour leurs liens vers votre site.

---

## 🔗 URLs Importantes

| Page | URL |
|------|-----|
| Accueil | https://cma-education.com |
| Formations | https://cma-education.com/formations |
| Contact | https://cma-education.com/contact |
| Blog | https://cma-education.com/blog |
| Sitemap | https://cma-education.com/sitemap.xml |
| Robots.txt | https://cma-education.com/robots.txt |

---

## ✅ Checklist

- [ ] Accéder à Google Search Console
- [ ] Vérifier la propriété du domaine
- [ ] Soumettre sitemap.xml
- [ ] Soumettre sitemap-formations-btp.xml
- [ ] Demander indexation page d'accueil
- [ ] Demander indexation pages formations
- [ ] Demander indexation page contact
- [ ] Partager le nouveau site sur LinkedIn/Facebook

---

## 📞 Support Google

Si après 2 semaines le problème persiste :
- Utilisez l'outil "Suppression d'URL" dans Search Console pour supprimer les anciennes URLs en cache
- Contactez le support Google via Search Console

---

*Dernière mise à jour : 3 janvier 2026*
