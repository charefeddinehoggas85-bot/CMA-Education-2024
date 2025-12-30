'use client'

import { useState, useEffect } from 'react'
import { getFormation } from '@/lib/strapi'

export default function TestStrapiDebug() {
  const [logs, setLogs] = useState<string[]>([])
  const [result, setResult] = useState<any>(null)

  const addLog = (message: string) => {
    console.log(message)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    async function testStrapi() {
      addLog('🔍 Début test Strapi')
      addLog(`🔍 STRAPI_URL: ${process.env.NEXT_PUBLIC_STRAPI_URL}`)
      
      try {
        // Test 1: Fetch direct
        const testUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cma-education-strapi-production.up.railway.app'}/api/formations?filters[slug][$eq]=charge-affaires-batiment-alternance&populate=*`
        addLog(`🔍 URL de test: ${testUrl}`)
        
        const testResponse = await fetch(testUrl)
        addLog(`🔍 Test response status: ${testResponse.status}`)
        addLog(`🔍 Test response ok: ${testResponse.ok}`)
        
        if (testResponse.ok) {
          const testData = await testResponse.json()
          addLog(`🔍 Test data reçu: ${!!testData.data}`)
          addLog(`🔍 Test formation count: ${testData.data?.length || 0}`)
          
          if (testData.data && testData.data[0]) {
            addLog(`🔍 Test formation titre: ${testData.data[0].attributes?.title}`)
          }
        }
        
        // Test 2: getFormation
        addLog('📡 Test getFormation...')
        const strapiFormation = await getFormation('charge-affaires-batiment-alternance')
        addLog(`📊 getFormation result: ${!!strapiFormation}`)
        
        if (strapiFormation) {
          addLog(`📊 Formation ID: ${(strapiFormation as any).id}`)
          addLog(`📊 Formation titre: ${(strapiFormation as any).title}`)
          setResult(strapiFormation)
        }
        
      } catch (error: any) {
        addLog(`❌ Erreur: ${error.message}`)
        addLog(`❌ Stack: ${error.stack}`)
      }
    }
    
    testStrapi()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Strapi Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Logs:</h2>
        <div className="text-sm space-y-1 max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="font-mono">{log}</div>
          ))}
        </div>
      </div>
      
      {result && (
        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-bold mb-2">Résultat:</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}