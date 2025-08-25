import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection by running a simple query
    await prisma.$queryRaw`SELECT 1 as test`;
    
    // Get some basic stats
    const [
      slideCount,
      pageCount,
      titleCount,
      messageCount,
      donateCount
    ] = await Promise.all([
      prisma.slide.count(),
      prisma.page.count(),
      prisma.title.count(),
      prisma.messages.count(),
      prisma.donate.count()
    ]);

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      statistics: {
        slides: slideCount,
        pages: pageCount,
        articles: titleCount,
        messages: messageCount,
        donations: donateCount
      }
    });

  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed'
      },
      { status: 500 }
    );
  }
}