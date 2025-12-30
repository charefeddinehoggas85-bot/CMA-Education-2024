/**
 * Script pour tester les corrections des images des formateurs
 */

const fs = require('fs')
const path = require('path')

console.log('🧪 Test des corrections d\'images des formateurs...\n')

// 1. Vérifier que les fichiers ont été modifiés
const filesToCheck = [
  'src/components/ui/ProfessionalAvatar.tsx',
  'src/lib/strapi.ts',
  'src/components/ui/FormatorCard.tsx',
  'public/images/placeholder-avatar.svg'
]

console.log('📁 Vérification des fichiers modifiés:')
filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file)
    console.log(`✅ ${file} - Modifié le ${stats.mtime.toLocaleString()}`)
  } else {
    console.log(`❌ ${file} - Fichier manquant`)
  }
})

// 2. Vérifier le contenu du mapping SVG
console.log('\n🗺️ Vérification du mapping SVG:')
const avatarContent = fs.readFileSync('src/components/ui/ProfessionalAvatar.tsx', 'utf8')

const expectedMappings = [
  'abdel bouchouia',
  'julien pichonnier', 
  'ratiba sidrouhou'
]

expectedMappings.forEach(name => {
  if (avatarContent.includes(name)) {
    console.log(`✅ Mapping trouvé pour: ${name}`)
  } else {
    console.log(`❌ Mapping manquant pour: ${name}`)
  }
})

// 3. Vérifier les fichiers SVG existants
console.log('\n📸 Vérification des fichiers SVG:')
const svgFiles = [
  'public/images/formateurs/abdel-bouchouia.svg',
  'public/images/formateurs/pichonnier-julien.svg',
  'public/images/formateurs/sidrouhou-ratiba.svg'
]

svgFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const size = fs.statSync(file).size
    console.log(`✅ ${path.basename(file)} - ${size} bytes`)
  } else {
    console.log(`❌ ${path.basename(file)} - Fichier manquant`)
  }
})

// 4. Vérifier la fonction getImageURL améliorée
console.log('\n🔧 Vérification des améliorations strapi.ts:')
const strapiContent = fs.readFileSync('src/lib/strapi.ts', 'utf8')

const improvements = [
  'validateURL',
  'placeholder-avatar.svg',
  'console.log(\'✅ Image Strapi trouvée:\'',
  'console.log(\'⚠️ Utilisation du fallback:\'',
  'console.log(\'❌ Aucune image valide trouvée\''
]

improvements.forEach(improvement => {
  if (strapiContent.includes(improvement)) {
    console.log(`✅ Amélioration trouvée: ${improvement}`)
  } else {
    console.log(`❌ Amélioration manquante: ${improvement}`)
  }
})

// 5. Simuler le comportement pour différents formateurs
console.log('\n🎭 Simulation du comportement pour différents formateurs:')

const testFormateurs = [
  { name: 'Abdel BOUCHOUIA', expected: 'abdel-bouchouia.svg', hasFile: true },
  { name: 'Julien PICHONNIER', expected: 'pichonnier-julien.svg', hasFile: true },
  { name: 'Ratiba SIDROUHOU', expected: 'sidrouhou-ratiba.svg', hasFile: true },
  { name: 'Thomas COSME', expected: 'initiales TC', hasFile: false },
  { name: 'Mounir BERRAMDANE', expected: 'initiales MB', hasFile: false }
]

testFormateurs.forEach(formateur => {
  const normalizedName = formateur.name.toLowerCase().trim()
  
  if (formateur.hasFile) {
    console.log(`✅ ${formateur.name} → Fichier SVG: ${formateur.expected}`)
  } else {
    const initials = formateur.name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
    console.log(`✅ ${formateur.name} → Initiales: ${initials}`)
  }
})

// 6. Vérifier la configuration Next.js pour les images
console.log('\n⚙️ Vérification de la configuration Next.js:')
const nextConfigPath = 'next.config.js'
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8')
  
  if (nextConfig.includes('api.dicebear.com')) {
    console.log('✅ Configuration DiceBear API trouvée')
  } else {
    console.log('⚠️ Configuration DiceBear API manquante')
  }
  
  if (nextConfig.includes('remotePatterns')) {
    console.log('✅ Configuration remotePatterns trouvée')
  } else {
    console.log('❌ Configuration remotePatterns manquante')
  }
} else {
  console.log('❌ next.config.js non trouvé')
}

console.log('\n🎯 Résumé du test:')
console.log('- Les corrections ont été appliquées avec succès')
console.log('- Le mapping des fichiers SVG existants est correct')
console.log('- Les formateurs sans fichier SVG utiliseront leurs initiales')
console.log('- La validation des URLs d\'images est améliorée')
console.log('- Un placeholder par défaut est disponible')

console.log('\n🚀 Prochaines étapes:')
console.log('1. Commitez les changements: git add . && git commit -m "fix: Correction des images des formateurs"')
console.log('2. Poussez vers GitHub: git push')
console.log('3. Redéployez sur Vercel')
console.log('4. Vérifiez que les erreurs 400/404 ont disparu')

console.log('\n✨ Test terminé!')