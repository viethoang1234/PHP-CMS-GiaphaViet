'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Tin nhắn của bạn đã được gửi thành công!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          content: ''
        });
      } else {
        setMessage(result.error || 'Có lỗi xảy ra khi gửi tin nhắn');
      }
    } catch (error) {
      setMessage('Có lỗi xảy ra khi gửi tin nhắn');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Họ và tên *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nhập họ và tên của bạn"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Nhập địa chỉ email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Địa chỉ</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Nhập địa chỉ"
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">Nội dung *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          placeholder="Nhập nội dung tin nhắn"
          rows={6}
        />
      </div>

      <button 
        type="submit" 
        className="btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
      </button>

      {message && (
        <div 
          id="result"
          style={{
            marginTop: '15px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: message.includes('thành công') ? '#d4edda' : '#f8d7da',
            color: message.includes('thành công') ? '#155724' : '#721c24',
            border: `1px solid ${message.includes('thành công') ? '#c3e6cb' : '#f5c6cb'}`
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}