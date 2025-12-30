import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || null,
    NODE_ENV: process.env.NODE_ENV || null,
    timestamp: new Date().toISOString()
  })
}