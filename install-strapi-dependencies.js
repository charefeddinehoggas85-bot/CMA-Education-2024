#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 INSTALLATION DES DÉPENDANCES STRAPI DANS LE CLONE');
console.log('===================================================\n');

function installStrapiDependencies() {
    console.log('📦 Installation des dépendances Strapi...');
    
    const strapiDependencies = [
        '@strapi/strapi@4.25.9',
        '@strapi/plugin-email@4.25.9',
        '@strapi/plugin-upload@4.25.9',
        '@strapi/plugin-users-permissions@4.25.9',
        'pg@^8.16.3',
        'sharp@^0.34.5',
        'sqlite3@^5.1.6',
        'styled-components@^5.3.11'
    ];
    
    try {
        console.log('⏳ Installation en cours...');
        const command = `npm install ${strapiDependencies.join(' ')}`;
        console.log(`Commande: ${command}`);
        
        execSync(command, { 
            stdio: 'inherit',
            cwd: process.cwd()
        });
        
        console.log('✅ Dépendances Strapi installées avec succès!');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de l\'installation:', error.message);
        return false;
    }
}

function updatePackageJsonScripts() {
    console.log('\n📝 Mise à jour des scripts package.json...');
    
    const packageJsonPath = 'package.json';
    
    if (!fs.existsSync(packageJsonPath)) {
        console.error('❌ package.json non trouvé');
        return false;
    }
    
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Ajouter les scripts Strapi
        packageJson.scripts = {
            ...packageJson.scripts,
            'strapi': 'strapi',
            'strapi:build': 'strapi build',
            'strapi:develop': 'strapi develop',
            'strapi:start': 'strapi start',
            'cms:dev': 'strapi develop',
            'cms:build': 'strapi build',
            'cms:start': 'strapi start'
        };
        
        // Ajouter la configuration Strapi
        packageJson.strapi = {
            uuid: 'cma-education-clone-cms'
        };
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ Scripts Strapi ajoutés au package.json');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du package.json:', error.message);
        return false;
    }
}

function createStrapiEnvironment() {
    console.log('\n🔐 Configuration de l\'environnement Strapi...');
    
    // Créer .env pour Strapi si il n'existe pas
    const envPath = '.env';
    if (!fs.existsSync(envPath)) {
        const envContent = `# Strapi Configuration
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Disable Strapi Analytics
STRAPI_TELEMETRY_DISABLED=true
`;
        
        fs.writeFileSync(envPath, envContent);
        console.log('✅ Fichier .env créé pour Strapi');
    } else {
        console.log('✅ Fichier .env existe déjà');
    }
    
    return true;
}

function verifyInstallation() {
    console.log('\n🔍 Vérification de l\'installation...');
    
    try {
        // Vérifier que Strapi est installé
        execSync('npm list @strapi/strapi', { stdio: 'pipe' });
        console.log('✅ @strapi/strapi installé');
        
        // Vérifier les plugins essentiels
        const plugins = ['@strapi/plugin-upload', '@strapi/plugin-users-permissions'];
        plugins.forEach(plugin => {
            try {
                execSync(`npm list ${plugin}`, { stdio: 'pipe' });
                console.log(`✅ ${plugin} installé`);
            } catch (error) {
                console.log(`⚠️ ${plugin} non trouvé`);
            }
        });
        
        return true;
    } catch (error) {
        console.error('❌ Vérification échouée:', error.message);
        return false;
    }
}

function provideNextSteps() {
    console.log('\n🚀 PROCHAINES ÉTAPES');
    console.log('===================');
    
    console.log('1. ✅ Configurer les variables d\'environnement:');
    console.log('   - Éditer le fichier .env avec vos vraies clés');
    console.log('   - Générer des clés sécurisées si nécessaire');
    
    console.log('\n2. ✅ Démarrer Strapi:');
    console.log('   npm run strapi:develop');
    console.log('   # ou npm run cms:dev');
    
    console.log('\n3. ✅ Créer un compte admin:');
    console.log('   - Ouvrir http://localhost:1337/admin');
    console.log('   - Créer le premier compte administrateur');
    
    console.log('\n4. ✅ Tester l\'import des médias:');
    console.log('   - Aller dans Media Library');
    console.log('   - Tester l\'upload d\'images');
    console.log('   - Vérifier les APIs et contrôleurs');
    
    console.log('\n5. ✅ Synchroniser les données:');
    console.log('   - Importer les content types existants');
    console.log('   - Configurer les permissions');
    console.log('   - Tester les APIs');
}

function main() {
    console.log('🎯 OBJECTIF: Installer Strapi dans le clone pour résoudre les problèmes d\'import de médias\n');
    
    const steps = [
        { name: 'Installation des dépendances', fn: installStrapiDependencies },
        { name: 'Mise à jour des scripts', fn: updatePackageJsonScripts },
        { name: 'Configuration environnement', fn: createStrapiEnvironment },
        { name: 'Vérification installation', fn: verifyInstallation }
    ];
    
    let successCount = 0;
    
    steps.forEach((step, index) => {
        console.log(`\n${index + 1}. ${step.name.toUpperCase()}`);
        console.log('='.repeat(step.name.length + 3));
        
        if (step.fn()) {
            successCount++;
            console.log(`✅ ${step.name} réussie`);
        } else {
            console.log(`❌ ${step.name} échouée`);
        }
    });
    
    console.log('\n📊 RÉSULTAT FINAL');
    console.log('=================');
    console.log(`✅ Étapes réussies: ${successCount}/${steps.length}`);
    
    if (successCount === steps.length) {
        console.log('🎉 INSTALLATION STRAPI COMPLÈTE!');
        console.log('Le clone peut maintenant gérer les imports de médias');
        provideNextSteps();
    } else {
        console.log('⚠️ Installation partielle - vérifier les erreurs ci-dessus');
    }
    
    console.log('\n✨ Installation terminée!');
}

main();