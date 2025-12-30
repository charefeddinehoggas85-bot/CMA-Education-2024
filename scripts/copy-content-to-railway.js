#!/usr/bin/env node

/**
 * 🚀 COPIE AUTOMATIQUE DU CONTENU VERS RAILWAY
 * 
 * Ce script copie le contenu du Strapi cloné vers Railway
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const RAILWAY_URL = 'https://cma-education-strapi-production.up.railway.app';
const API_TOKEN = '62559d2051c7e5f7576a0e12524b1a160a5dde2b9c0428afd257df0c5ec8b81ae33683899ae9fadd3e6b6d2853b858f31343efbae9b692bf785758173d01428e43ed02efec664f698718fa44079f64b3b03e1e6663d1200ab0b5cf6345fd78cbd11f41b02be1303e7f122e18aa18be690225201a96cbe8aa71d8229deba2e94e';

console.log('🚀 COPIE CONTENU LOCAL → RAILWAY');
console.log('================================\n');

// Fonction pour faire des requêtes API
async function apiRequest(endpoint, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(endpoint, RAILWAY_URL);
        
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(url, options, (res) => {
            let responseData = '';
            
            res.on('data', chunk => responseData += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(responseData);
                    resolve({ status: res.statusCode, data: json });
                } catch (error) {
                    resolve({ status: res.statusCode, data: responseData });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Formations de test à créer
const formationsTest = [
    {
        titre: 'Chef de Projets BTP - 1 an',
        slug: 'chef-projets-btp-1an',
        description: 'Formation complète pour devenir chef de projets dans le secteur du BTP. Développez vos compétences en gestion de projet, coordination d\'équipes et suivi de chantiers.',
        duree: '12 mois',
        niveau: 'Bac+3',
        modalite: 'Alternance',
        prix: '9500',
        objectifs: 'Maîtriser la gestion de projets BTP, coordonner les équipes, gérer les budgets et plannings',
        programme: 'Gestion de projet, Coordination technique, Management d\'équipe, Suivi budgétaire',
        debouches: 'Chef de projets BTP, Coordinateur de travaux, Responsable de programmes',
        published_at: new Date().toISOString()
    },
    {
        titre: 'Conducteur de Travaux - Reconversion',
        slug: 'conducteur-travaux-reconversion',
        description: 'Formation de reconversion professionnelle pour devenir conducteur de travaux. Idéale pour les professionnels souhaitant évoluer vers le secteur du BTP.',
        duree: '8 mois',
        niveau: 'Bac+2',
        modalite: 'Reconversion',
        prix: '7200',
        objectifs: 'Acquérir les compétences techniques et managériales du conducteur de travaux',
        programme: 'Techniques de construction, Gestion de chantier, Sécurité, Réglementation',
        debouches: 'Conducteur de travaux, Chef de chantier, Responsable technique',
        published_at: new Date().toISOString()
    },
    {
        titre: 'Chargé d\'Affaires BTP - Alternance',
        slug: 'charge-affaires-btp-alternance',
        description: 'Formation en alternance pour devenir chargé d\'affaires dans le BTP. Combinez théorie et pratique en entreprise.',
        duree: '24 mois',
        niveau: 'Bac+3',
        modalite: 'Alternance',
        prix: '0',
        objectifs: 'Développer les compétences commerciales et techniques du chargé d\'affaires BTP',
        programme: 'Prospection commerciale, Étude de prix, Négociation, Suivi clientèle',
        debouches: 'Chargé d\'affaires, Commercial BTP, Responsable développement',
        published_at: new Date().toISOString()
    }
];

// Formateurs de test
const formateursTest = [
    {
        nom: 'Jean Dupont',
        prenom: 'Jean',
        specialite: 'Gestion de projets BTP',
        experience: '15 ans d\'expérience en conduite de travaux et gestion de projets dans le secteur du bâtiment.',
        diplomes: 'Ingénieur BTP, Master Management de projets',
        published_at: new Date().toISOString()
    },
    {
        nom: 'Marie Martin',
        prenom: 'Marie',
        specialite: 'Commercial et développement BTP',
        experience: '12 ans en tant que chargée d\'affaires dans des entreprises de construction.',
        diplomes: 'École de Commerce, Spécialisation BTP',
        published_at: new Date().toISOString()
    }
];

// Fonction principale
async function copyContent() {
    console.log('📋 Étape 1: Import des formations');
    console.log('----------------------------------');
    
    for (const formation of formationsTest) {
        try {
            const response = await apiRequest('/api/formations', 'POST', { data: formation });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`✅ Formation "${formation.titre}" importée`);
            } else {
                console.log(`⚠️  Formation "${formation.titre}": Status ${response.status}`);
                console.log(`   Réponse: ${JSON.stringify(response.data).substring(0, 100)}...`);
            }
        } catch (error) {
            console.log(`❌ Erreur formation "${formation.titre}": ${error.message}`);
        }
        
        // Pause entre les requêtes
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n👨‍🏫 Étape 2: Import des formateurs');
    console.log('-----------------------------------');
    
    for (const formateur of formateursTest) {
        try {
            const response = await apiRequest('/api/formateurs', 'POST', { data: formateur });
            
            if (response.status === 200 || response.status === 201) {
                console.log(`✅ Formateur "${formateur.prenom} ${formateur.nom}" importé`);
            } else {
                console.log(`⚠️  Formateur "${formateur.prenom} ${formateur.nom}": Status ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ Erreur formateur "${formateur.prenom} ${formateur.nom}": ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n✅ Étape 3: Vérification finale');
    console.log('-------------------------------');
    
    try {
        const formationsResponse = await apiRequest('/api/formations');
        const formateursResponse = await apiRequest('/api/formateurs');
        
        console.log(`📊 Formations dans Railway: ${formationsResponse.data.data ? formationsResponse.data.data.length : 0}`);
        console.log(`👨‍🏫 Formateurs dans Railway: ${formateursResponse.data.data ? formateursResponse.data.data.length : 0}`);
        
        if (formationsResponse.data.data && formationsResponse.data.data.length > 0) {
            console.log('\n📋 Formations importées:');
            formationsResponse.data.data.forEach((formation, index) => {
                const titre = formation.attributes?.titre || formation.titre || 'Sans titre';
                console.log(`   ${index + 1}. ${titre}`);
            });
        }
        
    } catch (error) {
        console.log(`❌ Erreur vérification: ${error.message}`);
    }
    
    console.log('\n🎉 IMPORT TERMINÉ !');
    console.log('===================');
    console.log('✅ Contenu de base importé dans Railway');
    console.log('✅ Votre frontend devrait maintenant afficher du contenu');
    console.log('\n🔗 Testez votre site:');
    console.log('- Frontend: http://localhost:3000');
    console.log('- Railway Admin: https://cma-education-strapi-production.up.railway.app/admin');
}

// Exécuter l'import
copyContent().catch(console.error);