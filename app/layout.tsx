import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gia Phả Việt - Hệ thống quản lý gia phả trực tuyến',
  description: 'Website quản lý gia phả và dòng họ trực tuyến',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <div id="wrapper">
          <div id="banner">
            <div className="menu">
              <div className="left">
                <ul>
                  <a href="/news"><li>Tin tức</li></a>
                  <a href="/noti"><li>Thông báo</li></a>
                </ul>
              </div>
              <a href="/"><div className="home"></div></a>
              <div className="right">
                <ul>
                  <a href="/treeperson"><li>Cây gia phả</li></a>
                  <a href="/page/gioi-thieu-1"><li>Giới thiệu</li></a>
                </ul>
              </div>
            </div>
            
            <form className="search" action="/search/result/">
              <input type="text" placeholder="Nhập nội dung tìm kiếm" name="q" className="textsearch" id="textsearch"/>
              <input type="submit" value="" className="searchbtn" />
            </form>
          </div>
          
          <div id="main">
            <div id="left">
              <h1>DANH MỤC</h1>
              <div className="menu">
                <ul>
                  <a href="/"><li>Trang chủ</li></a>
                  <a href="/tree-per-son"><li>Cây gia phả</li></a>
                  <a href="/gallery"><li>Thư viện ảnh</li></a>
                  <a href="/list-person"><li>Danh bạ</li></a>
                  <a href="/donate"><li>Đóng góp</li></a>
                  <a href="/noti"><li>Thông báo</li></a>
                  <a href="/news"><li>Tin tức</li></a>
                  <a href="/die"><li>Cáo phó</li></a>
                  <a href="/contact"><li>Liên hệ</li></a>
                </ul>
              </div>
            </div>
            <div id="content">
              <div className="center">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}