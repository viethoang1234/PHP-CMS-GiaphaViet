import { prisma } from '@/lib/prisma'

export default async function DonatePage() {
  // Fetch all donations from database
  const donations = await prisma.donate.findMany({
    orderBy: { id: 'desc' }
  });

  // Calculate total donations
  const totalAmount = donations.reduce((sum, donation) => sum + donation.value, 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Danh sách đóng góp
      </h1>

      <div 
        className="donation-summary"
        style={{
          background: '#e8f5e8',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>
          Tổng số đóng góp: {totalAmount.toLocaleString('vi-VN')} VNĐ
        </h2>
        <p style={{ color: '#666' }}>
          Số lượt đóng góp: {donations.length} lượt
        </p>
      </div>

      {donations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Chưa có thông tin đóng góp nào.</p>
        </div>
      ) : (
        <div className="donations-table-container">
          <table className="donate-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}>STT</th>
                <th style={{ width: '25%' }}>Họ và tên</th>
                <th style={{ width: '35%' }}>Địa chỉ</th>
                <th style={{ width: '15%' }}>Số điện thoại</th>
                <th style={{ width: '20%' }}>Số tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation.id}>
                  <td style={{ textAlign: 'center' }}>{index + 1}</td>
                  <td style={{ fontWeight: 'bold' }}>{donation.name}</td>
                  <td>{donation.address}</td>
                  <td>{donation.phone}</td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold', color: '#4CAF50' }}>
                    {donation.value.toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div 
        className="donation-info"
        style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}
      >
        <h3 style={{ marginBottom: '15px', color: '#333' }}>Thông tin đóng góp</h3>
        <p>
          Chúng tôi xin chân thành cảm ơn tất cả các thành viên trong dòng họ đã có những đóng góp 
          quý báu để xây dựng và duy trì website gia phả.
        </p>
        <p>
          Mọi đóng góp đều được ghi nhận và sử dụng để phát triển các tính năng mới, 
          duy trì hoạt động của hệ thống và tổ chức các hoạt động của dòng họ.
        </p>
        <p style={{ fontStyle: 'italic', color: '#666' }}>
          Để đóng góp, vui lòng liên hệ với ban quản trị qua trang liên hệ.
        </p>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Danh sách đóng góp - Gia Phả Việt',
  description: 'Danh sách các đóng góp của thành viên dòng họ để xây dựng và phát triển website gia phả'
};