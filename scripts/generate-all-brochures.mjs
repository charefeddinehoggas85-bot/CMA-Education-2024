import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import modules
const dataModule = await import('../src/lib/data.ts');
const generatorModule = await import('../src/lib/brochure-generator.ts');

const { formationsAlternance, formationsReconversion } = dataModule;
const { formationsVRD } = await import('../src/lib/formations-vrd.ts');
const { generateBrochureHTML } = generatorModule;

const brochuresDir = path.join(__dirname, '../brochures');

const allFormations = [...formationsAlternance, ...formationsReconversion, ...formationsVRD];

console.log(`Génération de ${allFormations.length} brochures...\n`);

let success = 0;
let errors = 0;

allFormations.forEach(formation => {
  try {
    const html = generateBrochureHTML(formation.id);
    const filename = `${formation.id}.html`;
    const filepath = path.join(brochuresDir, filename);
    
    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`✓ ${filename}`);
    success++;
  } catch (error) {
    console.error(`✗ ${formation.id}: ${error.message}`);
    errors++;
  }
});

console.log(`\n${success} brochures créées, ${errors} erreurs`);
