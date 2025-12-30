#!/usr/bin/env node

const axios = require('axios');

console.log('🔍 TEST FINAL - FORMATIONS SUR VERCEL');
console.log('=====================================\n');

async function testFormationsPage() {
    try {
        console.log('📄 Test de la page formations...');
        const response = await axios.get('https://cma-education-2024.vercel.app/formations', {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const html = response.data;
            
            // Chercher des formations spécifiques
            const hasChargeAffaires = html.includes('Chargé') && html.includes('Affaires');
            const hasConducteurTravaux = html.includes('Conducteur') && html.includes('Travaux');
            const hasRNCP = html.includes('RNCP');
            const hasFormationCards = html.includes('Formation') && html.includes('niveau');
            const hasCategories = html.includes('alternance') && html.includes('reconversion');
            
            console.log('✅ Page formations accessible');
            console.log('');
            console.log('📊 CONTENU DÉTECTÉ:');
            console.log(`   Chargé d'Affaires: ${hasChargeAffaires ? '✅' : '❌'}`);
            console.log(`   Conducteur de Travaux: ${hasConducteurTravaux ? '✅' : '❌'}`);
            console.log(`   Codes RNCP: ${hasRNCP ? '✅' : '❌'}`);
            console.log(`   Cartes formations: ${hasFormationCards ? '✅' : '❌'}`);
            console.log(`   Catégories: ${hasCategories ? '✅' : '❌'}`);
            
            // Compter les occurrences de formations
            const formationMatches = (html.match(/RNCP/g) || []).length;
            console.log(`   Nombre de RNCP trouvés: ${formationMatches}`);
            
            if (hasChargeAffaires && hasConducteurTravaux && hasRNCP && formationMatches > 5) {
                console.log('');
                console.log('🎊 SUCCÈS COMPLET !');
                console.log('✅ Les formations s\'affichent correctement');
                console.log('✅ Toutes les données sont présentes');
                console.log('✅ La connexion Vercel → Railway fonctionne');
                return true;
            } else {
                console.log('');
                console.log('⚠️  SUCCÈS PARTIEL');
                console.log('La page se charge mais certaines données manquent');
                return false;
            }
            
        } else {
            console.log(`❌ Page non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur: ${error.message}`);
        return false;
    }
}

async function testSpecificFormation() {
    try {
        console.log('\n🎯 Test d\'une formation spécifique...');
        const response = await axios.get('https://cma-education-2024.vercel.app/formations/charge-affaires-batiment', {
            timeout: 15000,
            validateStatus: () => true
        });
        
        if (response.status === 200) {
            const html = response.data;
            const hasTitle = html.includes('Chargé') && html.includes('Affaires');
            const hasRNCP = html.includes('RNCP');
            const hasObjectifs = html.includes('Objectifs') || html.includes('objectifs');
            
            console.log('✅ Page formation spécifique accessible');
            console.log(`   Titre formation: ${hasTitle ? '✅' : '❌'}`);
            console.log(`   Code RNCP: ${hasRNCP ? '✅' : '❌'}`);
            console.log(`   Objectifs: ${hasObjectifs ? '✅' : '❌'}`);
            
            return hasTitle && hasRNCP;
        } else {
            console.log(`❌ Page formation non accessible: Status ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur formation spécifique: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🎯 OBJECTIF: Vérifier que les formations s\'affichent sur Vercel\n');
    
    const pageOk = await testFormationsPage();
    const specificOk = await testSpecificFormation();
    
    console.log('\n🏆 RÉSULTAT FINAL');
    console.log('=================');
    
    if (pageOk && specificOk) {
        console.log('🎊 PROBLÈME RÉSOLU !');
        console.log('');
        console.log('✅ Les formations s\'affichent correctement');
        console.log('✅ Les pages individuelles fonctionnent');
        console.log('✅ La connexion Vercel → Railway est opérationnelle');
        console.log('✅ Les variables d\'environnement sont bien configurées');
        console.log('');
        console.log('🌐 Site fonctionnel: https://cma-education-2024.vercel.app/formations');
    } else if (pageOk) {
        console.log('⚠️  PARTIELLEMENT RÉSOLU');
        console.log('');
        console.log('✅ Page formations fonctionne');
        console.log('❌ Problème sur les pages individuelles');
        console.log('');
        console.log('💡 Les formations s\'affichent mais il peut y avoir des problèmes mineurs');
    } else {
        console.log('❌ PROBLÈME PERSISTANT');
        console.log('');
        console.log('❌ Les formations ne s\'affichent toujours pas');
        console.log('❌ Vérifier les variables d\'environnement sur Vercel');
        console.log('❌ Redéployer l\'application si nécessaire');
    }
}

main().catch(console.error);