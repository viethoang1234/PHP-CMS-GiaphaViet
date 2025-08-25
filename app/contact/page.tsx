import { prisma } from '@/lib/prisma'
import ContactForm from './send-contact-form'

export default async function ContactPage() {
  // Fetch contact page content if it exists
  const contactInfo = await prisma.contact.findFirst();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Liên hệ với chúng tôi
      </h1>

      {contactInfo && contactInfo.content && (
        <div 
          className="contact-info"
          style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
          }}
          dangerouslySetInnerHTML={{ __html: contactInfo.content }}
        />
      )}

      <div className="contact-form">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Gửi tin nhắn</h2>
        <ContactForm />
      </div>

      <div 
        className="contact-additional-info"
        style={{
          marginTop: '40px',
          padding: '20px',
          background: '#e8f5e8',
          borderRadius: '8px'
        }}
      >
        <h3>Thông tin liên hệ</h3>
        <p>Chúng tôi luôn sẵn sàng lắng nghe ý kiến đóng góp của các thành viên trong dòng họ.</p>
        <p>Vui lòng điền đầy đủ thông tin vào form trên để chúng tôi có thể liên hệ lại với bạn.</p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Liên hệ - Gia Phả Việt',
  description: 'Liên hệ với chúng tôi để được hỗ trợ và tư vấn về gia phả dòng họ'
};