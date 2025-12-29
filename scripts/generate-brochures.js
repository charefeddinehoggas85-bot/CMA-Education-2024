const fs = require('fs');
const path = require('path');

// Import data
const { formationsAlternance, formationsReconversion, formationsVRD } = require('../src/lib/data.ts');
const { generateBrochureHTML } = require('../src/lib/brochure-generator.ts');

const brochuresDir = path.join(__dirname, '../brochures');

// Get all formations
const allFormations = [...formationsAlternance, ...formationsReconversion, ...formationsVRD];

console.log(`Génération de ${allFormations.length} brochures...`);

allFormations.forEach(formation => {
  try {
    const html = generateBrochureHTML(formation.id);
    const filename = `${formation.id}.html`;
    const filepath = path.join(brochuresDir, filename);
    
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`✓ ${filename} créé`);
  } catch (error) {
    console.error(`✗ Erreur pour ${formation.id}:`, error.message);
  }
});

console.log('\nGénération terminée!');
