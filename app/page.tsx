import { prisma } from '@/lib/prisma'
import { Slide, Catalog, Title } from '@prisma/client'

// Helper function to strip HTML tags and decode entities (equivalent to PHP's m_unhtmlchars)
function stripHtmlAndDecode(str: string): string {
  return str.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, '');
}

// Helper function to create URL-friendly slugs (equivalent to PHP's locdau + idtourl)
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

export default async function HomePage() {
  // Fetch slides
  const slides = await prisma.slide.findMany();
  
  // Fetch latest announcements (FID = 1)
  const announcements = await prisma.title.findMany({
    where: { fid: 1 },
    orderBy: { dateCreate: 'desc' },
    take: 5,
    include: { catalog: true }
  });

  // Fetch latest news (FID = 2) 
  const news = await prisma.title.findMany({
    where: { fid: 2 },
    orderBy: { dateCreate: 'desc' },
    take: 5,
    include: { catalog: true }
  });

  return (
    <div>
      {/* Slides Section */}
      {slides.length > 0 && (
        <div className="slide_main">
          <div id="pix_diapo">
            {slides.map((slide) => (
              <div key={slide.id} data-thumb={slide.url}>
                <img src={slide.url} alt="Slide" />
                <div className="caption elemHover fromLeft" dangerouslySetInnerHTML={{ __html: slide.info }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Section */}
      <div style={{ margin: '20px' }} className="catalog_list">
        <h3>Thông báo:</h3>
        {announcements.map((announcement) => (
          <div key={announcement.tid} style={{ marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
            <h4>
              <a 
                href={`/tin/${createSlug(stripHtmlAndDecode(announcement.title), announcement.tid)}`}
                style={{ color: '#333', textDecoration: 'none' }}
              >
                {stripHtmlAndDecode(announcement.title)}
              </a>
            </h4>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Ngày: {announcement.dateCreate.toLocaleDateString('vi-VN')} | Tác giả: {announcement.author}
            </div>
            <div dangerouslySetInnerHTML={{ __html: announcement.description }} />
          </div>
        ))}
      </div>

      {/* News Section */}
      <div style={{ margin: '20px' }} className="catalog_list">
        <h3>Tin tức:</h3>
        {news.map((newsItem) => (
          <div key={newsItem.tid} style={{ marginBottom: '15px', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
            <h4>
              <a 
                href={`/tin/${createSlug(stripHtmlAndDecode(newsItem.title), newsItem.tid)}`}
                style={{ color: '#333', textDecoration: 'none' }}
              >
                {stripHtmlAndDecode(newsItem.title)}
              </a>
            </h4>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              Ngày: {newsItem.dateCreate.toLocaleDateString('vi-VN')} | Tác giả: {newsItem.author}
            </div>
            <div dangerouslySetInnerHTML={{ __html: newsItem.description }} />
          </div>
        ))}
      </div>

      {/* Latest notification banner */}
      {announcements.length > 0 && (
        <div id="noti" style={{ background: '#fff3cd', padding: '10px', margin: '20px 0', borderRadius: '5px' }}>
          <marquee>
            Thông báo: {' '}
            <a 
              href={`/tin/${createSlug(stripHtmlAndDecode(announcements[0].title), announcements[0].tid)}`}
              style={{ color: 'red' }}
            >
              {stripHtmlAndDecode(announcements[0].title)}
            </a>
          </marquee>
        </div>
      )}
    </div>
  );
}