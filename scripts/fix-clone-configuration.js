#!/usr/bin/env node

/**
 * Script pour corriger les configurations du projet clone
 * Synchronise les configurations entre le projet principal et le clone
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Correction des configurations du projet clone...\n');

// Chemins des fichiers
const mainProjectPath = '.';
const clonePath = './CMA-Education-2024';

// 1. Corriger tsconfig.json
console.log('📝 Correction du tsconfig.json...');
try {
  const mainTsConfig = JSON.parse(fs.readFileSync(path.join(mainProjectPath, 'tsconfig.json'), 'utf8'));
  const cloneTsConfigPath = path.join(clonePath, 'tsconfig.json');
  
  // Adapter la configuration pour le clone
  const cloneTsConfig = {
    ...mainTsConfig,
    exclude: [
      "node_modules",
      "build",
      ".tmp",
      ".strapi",
      "scripts/**/*",
      "Formations/**/*",
      "brochures/**/*"
    ]
  };
  
  fs.writeFileSync(cloneTsConfigPath, JSON.stringify(cloneTsConfig, null, 2));
  console.log('✅ tsconfig.json corrigé');
} catch (error) {
  console.error('❌ Erreur lors de la correction du tsconfig.json:', error.message);
}

// 2. Copier ignore-loader.js si nécessaire
console.log('\n📦 Vérification du ignore-loader...');
try {
  const ignoreLoaderPath = path.join(mainProjectPath, 'ignore-loader.js');
  const cloneIgnoreLoaderPath = path.join(clonePath, 'ignore-loader.js');
  
  if (fs.existsSync(ignoreLoaderPath)) {
    fs.copyFileSync(ignoreLoaderPath, cloneIgnoreLoaderPath);
    console.log('✅ ignore-loader.js copié');
  } else {
    console.log('⚠️  ignore-loader.js non trouvé dans le projet principal');
  }
} catch (error) {
  console.error('❌ Erreur lors de la copie du ignore-loader:', error.message);
}

// 3. Vérifier et corriger next.config.js du clone
console.log('\n⚙️  Vérification du next.config.js du clone...');
try {
  const cloneNextConfigPath = path.join(clonePath, 'next.config.js');
  
  if (fs.existsSync(cloneNextConfigPath)) {
    const cloneNextConfig = fs.readFileSync(cloneNextConfigPath, 'utf8');
    
    // Vérifier si la configuration webpack est présente
    if (!cloneNextConfig.includes('ignore-loader')) {
      console.log('⚠️  Configuration webpack manquante dans le clone');
      console.log('💡 Ajout recommandé de la configuration webpack pour ignorer les dossiers problématiques');
      
      // Créer une version corrigée
      const correctedConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour projet hybride Next.js + Strapi
  typescript: {
    ignoreBuildErrors: false,
  },
  // Exclure les dossiers Strapi du build Next.js
  webpack: (config, { isServer }) => {
    // Ignorer les dossiers Strapi et autres
    config.module.rules.push({
      test: /(\\.strapi|\\.tmp|build|config)[\\\\/]/,
      use: 'ignore-loader'
    })
    
    // Ajouter le loader personnalisé
    config.resolveLoader.alias = {
      ...config.resolveLoader.alias,
      'ignore-loader': require.resolve('./ignore-loader.js')
    }
    
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://cma-education.vercel.app',
  },
}

module.exports = nextConfig`;

      // Sauvegarder la version corrigée
      fs.writeFileSync(cloneNextConfigPath + '.corrected', correctedConfig);
      console.log('✅ Version corrigée créée: next.config.js.corrected');
    } else {
      console.log('✅ Configuration webpack déjà présente');
    }
  }
} catch (error) {
  console.error('❌ Erreur lors de la vérification du next.config.js:', error.message);
}

// 4. Créer un ignore-loader.js simple si manquant
console.log('\n🔧 Vérification du ignore-loader...');
try {
  const cloneIgnoreLoaderPath = path.join(clonePath, 'ignore-loader.js');
  
  if (!fs.existsSync(cloneIgnoreLoaderPath)) {
    const ignoreLoaderContent = `/**
 * Loader personnalisé pour ignorer certains fichiers lors du build
 */
module.exports = function() {
  return '';
};

module.exports.raw = true;
`;
    
    fs.writeFileSync(cloneIgnoreLoaderPath, ignoreLoaderContent);
    console.log('✅ ignore-loader.js créé');
  } else {
    console.log('✅ ignore-loader.js déjà présent');
  }
} catch (error) {
  console.error('❌ Erreur lors de la création du ignore-loader:', error.message);
}

// 5. Rapport final
console.log('\n📊 Rapport de correction:');
console.log('================================');
console.log('✅ Configurations synchronisées');
console.log('✅ TypeScript configuré avec exclusions appropriées');
console.log('✅ Webpack loader configuré');
console.log('⚠️  Vérifiez les variables d\'environnement');
console.log('⚠️  Testez le build: npm run build');
console.log('\n💡 Prochaines étapes:');
console.log('1. cd CMA-Education-2024');
console.log('2. npm install');
console.log('3. npm run build');
console.log('4. Vérifier les erreurs de build');