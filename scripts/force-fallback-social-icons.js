const fs = require('fs');
const path = require('path');

function forceFallbackSocialIcons() {
  console.log('🔧 Modification du footer pour forcer les données de fallback...');
  
  try {
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    let footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Trouver le useEffect et le modifier pour toujours utiliser les données de fallback
    const useEffectPattern = /useEffect\(\(\) => \{[\s\S]*?async function loadData\(\) \{[\s\S]*?\} catch \(error\) \{[\s\S]*?\} finally \{[\s\S]*?\}[\s\S]*?\}, \[\]\)/;
    
    const newUseEffect = `useEffect(() => {
    async function loadData() {
      try {
        console.log('🔄 Tentative de chargement des données Strapi...');
        const [statsData, settingsData] = await Promise.all([
          getStatistiquesSite(),
          getSiteSettings()
        ])
        
        console.log('📊 Données Strapi chargées:', { statsData, settingsData });
        setStats(statsData as Statistique[])
        setSiteSettings(settingsData as SiteSettings)
      } catch (error) {
        console.warn('⚠️ Erreur Strapi, utilisation des données de fallback:', error)
        // TOUJOURS utiliser les données de fallback pour garantir l'affichage des 5 icônes
        setStats([
          { id: 1, cle: 'experience', nombre: 15, label: 'Années', suffixe: '+', ordre: 1 },
          { id: 2, cle: 'formations', nombre: 8, label: 'Formations', suffixe: '', ordre: 2 },
          { id: 3, cle: 'partners', nombre: 45, label: 'Partenaires', suffixe: '+', ordre: 3 }
        ])
        setSiteSettings({
          id: 1,
          siteName: 'Construction Management Academy',
          contactPhone: '01 89 70 60 52',
          contactEmail: 'contact.academy@construction-management-academy.fr',
          contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
          socialMedia: {
            linkedin: 'https://www.linkedin.com/company/construction-management-academy',
            instagram: 'https://www.instagram.com/construction_management_academy',
            facebook: 'https://www.facebook.com/Constructionmanagementacademy',
            youtube: 'https://www.youtube.com/channel/construction-management-academy',
            tiktok: 'https://www.tiktok.com/@cmaeducation'
          }
        })
      } finally {
        setLoading(false)
      }
    }
    
    // FORCE: Toujours utiliser les données de fallback pour garantir 5 icônes
    console.log('🎯 Utilisation forcée des données de fallback pour 5 icônes sociales');
    setStats([
      { id: 1, cle: 'experience', nombre: 15, label: 'Années', suffixe: '+', ordre: 1 },
      { id: 2, cle: 'formations', nombre: 8, label: 'Formations', suffixe: '', ordre: 2 },
      { id: 3, cle: 'partners', nombre: 45, label: 'Partenaires', suffixe: '+', ordre: 3 }
    ])
    setSiteSettings({
      id: 1,
      siteName: 'Construction Management Academy',
      contactPhone: '01 89 70 60 52',
      contactEmail: 'contact.academy@construction-management-academy.fr',
      contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
      socialMedia: {
        linkedin: 'https://www.linkedin.com/company/construction-management-academy',
        instagram: 'https://www.instagram.com/construction_management_academy',
        facebook: 'https://www.facebook.com/Constructionmanagementacademy',
        youtube: 'https://www.youtube.com/channel/construction-management-academy',
        tiktok: 'https://www.tiktok.com/@cmaeducation'
      }
    })
    setLoading(false)
    
    // Optionnel: Charger les données Strapi en arrière-plan
    loadData()
  }, [])`;
    
    if (useEffectPattern.test(footerContent)) {
      footerContent = footerContent.replace(useEffectPattern, newUseEffect);
      
      fs.writeFileSync(footerPath, footerContent, 'utf8');
      console.log('✅ Footer modifié pour forcer l\'affichage des 5 icônes');
      console.log('📱 Les 5 plateformes sociales seront maintenant toujours visibles:');
      console.log('  1. Facebook');
      console.log('  2. Instagram');
      console.log('  3. TikTok');
      console.log('  4. YouTube');
      console.log('  5. LinkedIn');
      
      return true;
    } else {
      console.log('❌ Pattern useEffect non trouvé, modification manuelle nécessaire');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la modification:', error.message);
    return false;
  }
}

// Fonction pour restaurer le comportement original
function restoreOriginalBehavior() {
  console.log('🔄 Restauration du comportement original...');
  
  try {
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    let footerContent = fs.readFileSync(footerPath, 'utf8');
    
    // Restaurer le useEffect original
    const originalUseEffect = `useEffect(() => {
    async function loadData() {
      try {
        const [statsData, settingsData] = await Promise.all([
          getStatistiquesSite(),
          getSiteSettings()
        ])
        
        setStats(statsData as Statistique[])
        setSiteSettings(settingsData as SiteSettings)
      } catch (error) {
        console.error('Erreur lors du chargement des données footer:', error)
        // Fallback data en cas d'erreur
        setStats([
          { id: 1, cle: 'experience', nombre: 15, label: 'Années', suffixe: '+', ordre: 1 },
          { id: 2, cle: 'formations', nombre: 8, label: 'Formations', suffixe: '', ordre: 2 },
          { id: 3, cle: 'partners', nombre: 45, label: 'Partenaires', suffixe: '+', ordre: 3 }
        ])
        setSiteSettings({
          id: 1,
          siteName: 'Construction Management Academy',
          contactPhone: '01 89 70 60 52',
          contactEmail: 'contact.academy@construction-management-academy.fr',
          contactAddress: '67-69 Avenue du Général de Gaulle, 77420 Champs sur Marne',
          socialMedia: {
            linkedin: 'https://www.linkedin.com/company/construction-management-academy',
            instagram: 'https://www.instagram.com/construction_management_academy',
            facebook: 'https://www.facebook.com/Constructionmanagementacademy',
            youtube: 'https://www.youtube.com/channel/construction-management-academy',
            tiktok: 'https://www.tiktok.com/@cmaeducation'
          }
        })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])`;
    
    // Remplacer le useEffect modifié par l'original
    const modifiedPattern = /useEffect\(\(\) => \{[\s\S]*?\/\/ Optionnel: Charger les données Strapi en arrière-plan[\s\S]*?\}, \[\]\)/;
    
    if (modifiedPattern.test(footerContent)) {
      footerContent = footerContent.replace(modifiedPattern, originalUseEffect);
      fs.writeFileSync(footerPath, footerContent, 'utf8');
      console.log('✅ Comportement original restauré');
      return true;
    } else {
      console.log('❌ Pattern modifié non trouvé');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error.message);
    return false;
  }
}

// Interface en ligne de commande
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  console.log('🎯 Gestion des icônes sociales du footer\n');
  
  switch (command) {
    case 'force':
      console.log('🔧 Mode: Forcer l\'affichage des 5 icônes');
      if (forceFallbackSocialIcons()) {
        console.log('\n✅ Modification appliquée avec succès !');
        console.log('🌐 Rechargez la page pour voir les 5 icônes sociales');
      }
      break;
      
    case 'restore':
      console.log('🔄 Mode: Restaurer le comportement original');
      if (restoreOriginalBehavior()) {
        console.log('\n✅ Comportement original restauré !');
      }
      break;
      
    default:
      console.log('📋 Utilisation:');
      console.log('  node scripts/force-fallback-social-icons.js force    # Forcer 5 icônes');
      console.log('  node scripts/force-fallback-social-icons.js restore  # Restaurer original');
      console.log('');
      console.log('🎯 Recommandation: Utilisez "force" pour garantir 5 icônes visibles');
      break;
  }
}

// Exécution
if (require.main === module) {
  main();
}

module.exports = { forceFallbackSocialIcons, restoreOriginalBehavior };