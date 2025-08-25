import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, content } = body;

    // Validate required fields
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ các trường bắt buộc (tên, email, nội dung)' },
        { status: 400 }
      );
    }

    // Save message to database
    const message = await prisma.messages.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || '',
        address: address?.trim() || '',
        content: content.trim(),
        date: new Date()
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Tin nhắn đã được gửi thành công!',
        id: message.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi lưu tin nhắn. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}