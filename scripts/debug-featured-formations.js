#!/usr/bin/env node

const fetch = require('node-fetch');

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function debugFeaturedFormations() {
  console.log('🔍 Debugging Featured Formations...\n');
  
  try {
    const url = `${STRAPI_URL}/api/formations?populate=*&sort=ordre:asc`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_API_TOKEN && {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      console.warn('⚠️ No formations found');
      return;
    }

    // Show full structure of first formation
    console.log('📋 Full structure of first formation:\n');
    console.log(JSON.stringify(data.data[0], null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugFeaturedFormations();
