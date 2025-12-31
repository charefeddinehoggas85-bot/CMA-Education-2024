const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function fixTypescriptBuildErrors() {
  console.log('🔧 Correction des erreurs TypeScript pour le build...\n');

  try {
    // 1. Vérifier et corriger les erreurs TypeScript communes
    console.log('📋 Vérification des fichiers API...');
    
    const apiFiles = [
      'src/app/api/download-brochure/route.ts',
      'src/app/api/proxy-brochure/route.ts',
      'src/app/api/send-brochure-notification/route.ts'
    ];

    apiFiles.forEach(filePath => {
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        console.log(`   ✅ ${filePath} existe`);
        
        // Lire le contenu et vérifier les erreurs communes
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Corriger les erreurs de type 'unknown' dans les catch blocks
        content = content.replace(
          /catch \(error\) \{[\s\S]*?error\.message/g,
          (match) => {
            return match.replace(/error\.message/g, 'error instanceof Error ? error.message : "Erreur inconnue"');
          }
        );
        
        // Corriger les erreurs de type any
        content = content.replace(/: any/g, ': unknown');
        
        // Écrire le fichier corrigé
        fs.writeFileSync(fullPath, content);
        console.log(`   🔧 ${filePath} corrigé`);
      } else {
        console.log(`   ⚠️ ${filePath} n'existe pas`);
      }
    });

    // 2. Tester le build TypeScript
    console.log('\n🔄 Test du build TypeScript...');
    
    try {
      execSync('npm run build', { 
        stdio: 'pipe',
        cwd: process.cwd()
      });
      console.log('✅ Build TypeScript réussi !');
      return true;
    } catch (buildError) {
      console.log('❌ Erreurs de build détectées:');
      console.log(buildError.stdout?.toString() || buildError.stderr?.toString());
      
      // Analyser les erreurs et proposer des corrections
      const errorOutput = buildError.stdout?.toString() || buildError.stderr?.toString() || '';
      
      if (errorOutput.includes("'error' is of type 'unknown'")) {
        console.log('\n🔧 Correction des erreurs de type "unknown"...');
        fixUnknownTypeErrors();
      }
      
      if (errorOutput.includes('Type error')) {
        console.log('\n🔧 Correction des erreurs de type génériques...');
        fixGenericTypeErrors(errorOutput);
      }
      
      return false;
    }

  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message);
    return false;
  }
}

function fixUnknownTypeErrors() {
  const filesToFix = [
    'src/app/api/download-brochure/route.ts',
    'src/app/api/proxy-brochure/route.ts'
  ];

  filesToFix.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Pattern pour corriger les catch blocks
      content = content.replace(
        /catch \(error\) \{([\s\S]*?)error\.message([\s\S]*?)\}/g,
        (match, before, after) => {
          const correctedBefore = before.replace(/error\.message/g, 'error instanceof Error ? error.message : "Erreur inconnue"');
          const correctedAfter = after.replace(/error\.message/g, 'error instanceof Error ? error.message : "Erreur inconnue"');
          return `catch (error) {${correctedBefore}error instanceof Error ? error.message : "Erreur inconnue"${correctedAfter}}`;
        }
      );
      
      // Corriger les accès directs à error.message
      content = content.replace(
        /(?<!error instanceof Error \? )error\.message/g,
        'error instanceof Error ? error.message : "Erreur inconnue"'
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`   ✅ ${filePath} corrigé pour les types unknown`);
    }
  });
}

function fixGenericTypeErrors(errorOutput) {
  // Analyser les erreurs spécifiques et les corriger
  const lines = errorOutput.split('\n');
  
  lines.forEach(line => {
    if (line.includes('Type error:') && line.includes('.ts:')) {
      const match = line.match(/\.\/(.+\.ts):(\d+):(\d+)/);
      if (match) {
        const [, filePath, lineNum, colNum] = match;
        console.log(`   🔍 Erreur détectée: ${filePath}:${lineNum}:${colNum}`);
        
        // Ici on pourrait ajouter des corrections spécifiques
        // basées sur le type d'erreur détecté
      }
    }
  });
}

// Fonction pour créer un fichier de configuration TypeScript strict
function createStrictTsConfig() {
  const tsConfig = {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "es6"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      },
      "noUnusedLocals": false,
      "noUnusedParameters": false,
      "exactOptionalPropertyTypes": false
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  };

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfig, null, 2));
  console.log('✅ Configuration TypeScript mise à jour');
}

// Exécuter les corrections
console.log('🚀 Démarrage de la correction des erreurs TypeScript...\n');

const success = fixTypescriptBuildErrors();

if (!success) {
  console.log('\n🔧 Tentative de correction supplémentaire...');
  createStrictTsConfig();
  
  // Réessayer le build
  try {
    execSync('npm run build', { 
      stdio: 'pipe',
      cwd: process.cwd()
    });
    console.log('✅ Build réussi après corrections !');
  } catch (error) {
    console.log('❌ Build échoue encore. Erreurs restantes:');
    console.log(error.stdout?.toString() || error.stderr?.toString());
  }
}

console.log('\n📊 Résumé:');
console.log('- Correction des types "unknown" dans les catch blocks');
console.log('- Mise à jour de la configuration TypeScript');
console.log('- Test du build pour validation');