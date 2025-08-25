import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

// Helper function to extract ID from URL (equivalent to PHP's urltoid)
function urlToId(url: string): number {
  const parts = url.split('.');
  const idPart = parts[0].split('-');
  return parseInt(idPart[idPart.length - 1]) || 0;
}

// Helper function to strip HTML tags and decode entities
function stripHtmlAndDecode(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
}

// Helper function to create URL-friendly slugs
function createSlug(name: string, id: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${slug}-${id}`;
}

interface PageProps {
  params: {
    id: string
  }
}

export default async function StaticPage({ params }: PageProps) {
  const { id: urlParam } = params;
  
  // Extract ID from URL parameter
  const pageId = urlToId(urlParam);
  
  if (!pageId) {
    notFound();
  }

  // Fetch page from database
  const page = await prisma.page.findUnique({
    where: { id: pageId }
  });

  if (!page) {
    notFound();
  }

  // Verify URL matches expected format (equivalent to PHP's URL validation)
  const expectedUrl = createSlug(stripHtmlAndDecode(page.pageName), page.id);
  if (urlParam !== expectedUrl) {
    notFound();
  }

  return (
    <div>
      <title>{stripHtmlAndDecode(page.pageName)}</title>
      <div style={{ padding: '20px' }}>
        <h1>{stripHtmlAndDecode(page.pageName)}</h1>
        <div 
          className="page-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
          style={{
            lineHeight: '1.6',
            fontSize: '16px',
            textAlign: 'left'
          }}
        />
      </div>
    </div>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { id: urlParam } = params;
  const pageId = urlToId(urlParam);
  
  if (!pageId) {
    return {
      title: 'Trang không tồn tại'
    };
  }

  const page = await prisma.page.findUnique({
    where: { id: pageId }
  });

  if (!page) {
    return {
      title: 'Trang không tồn tại'
    };
  }

  return {
    title: stripHtmlAndDecode(page.pageName),
    description: `${stripHtmlAndDecode(page.content).substring(0, 160)}...`
  };
}