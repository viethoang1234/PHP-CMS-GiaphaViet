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

interface ArticleProps {
  params: {
    tid: string
  }
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { tid: urlParam } = params;
  
  // Extract ID from URL parameter
  const titleId = urlToId(urlParam);
  
  if (!titleId) {
    notFound();
  }

  // Fetch article from database
  const article = await prisma.title.findUnique({
    where: { tid: titleId },
    include: { catalog: true }
  });

  if (!article) {
    notFound();
  }

  // Verify URL matches expected format
  const expectedUrl = createSlug(stripHtmlAndDecode(article.title), article.tid);
  if (urlParam !== expectedUrl) {
    notFound();
  }

  return (
    <div style={{ padding: '20px' }}>
      <article>
        <header style={{ marginBottom: '30px', borderBottom: '2px solid #4CAF50', paddingBottom: '20px' }}>
          <h1 style={{ color: '#333', marginBottom: '15px' }}>
            {stripHtmlAndDecode(article.title)}
          </h1>
          <div style={{ 
            fontSize: '14px', 
            color: '#666',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <span>📅 {article.dateCreate.toLocaleDateString('vi-VN')}</span>
            <span>👤 {article.author}</span>
            <span>📂 {article.catalog.name}</span>
          </div>
        </header>

        {article.description && (
          <div 
            className="article-description"
            style={{
              background: '#f8f9fa',
              padding: '15px',
              borderLeft: '4px solid #4CAF50',
              marginBottom: '25px',
              fontStyle: 'italic'
            }}
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        )}

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
          style={{
            lineHeight: '1.8',
            fontSize: '16px',
            textAlign: 'left'
          }}
        />
      </article>

      {/* Related articles from same category */}
      <RelatedArticles catalogId={article.fid} currentId={article.tid} />
    </div>
  );
}

// Component for related articles
async function RelatedArticles({ catalogId, currentId }: { catalogId: number, currentId: number }) {
  const relatedArticles = await prisma.title.findMany({
    where: {
      fid: catalogId,
      tid: { not: currentId }
    },
    orderBy: { dateCreate: 'desc' },
    take: 5,
    include: { catalog: true }
  });

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <aside style={{ 
      marginTop: '40px', 
      padding: '20px', 
      background: '#f8f9fa', 
      borderRadius: '8px' 
    }}>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>Bài viết liên quan</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {relatedArticles.map((article) => (
          <li key={article.tid} style={{ marginBottom: '12px' }}>
            <a 
              href={`/tin/${createSlug(stripHtmlAndDecode(article.title), article.tid)}`}
              style={{ 
                color: '#4CAF50', 
                textDecoration: 'none',
                fontSize: '15px'
              }}
            >
              {stripHtmlAndDecode(article.title)}
            </a>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              {article.dateCreate.toLocaleDateString('vi-VN')}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Generate metadata for the article
export async function generateMetadata({ params }: ArticleProps) {
  const { tid: urlParam } = params;
  const titleId = urlToId(urlParam);
  
  if (!titleId) {
    return {
      title: 'Bài viết không tồn tại'
    };
  }

  const article = await prisma.title.findUnique({
    where: { tid: titleId },
    include: { catalog: true }
  });

  if (!article) {
    return {
      title: 'Bài viết không tồn tại'
    };
  }

  return {
    title: stripHtmlAndDecode(article.title),
    description: stripHtmlAndDecode(article.description || article.content).substring(0, 160) + '...',
    keywords: `${article.catalog.name}, tin tức, gia phả việt`
  };
}