import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '../../../supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, carModel, fullName, phone, email, date, time } = body;

    // 1. Lưu thông tin đặt lịch vào Supabase table "car_bookings"
    const { data, error } = await supabase
      .from('car_bookings')
      .insert([
        {
          car_id: carId || null,
          car_model: carModel,
          customer_name: fullName,
          phone: phone,
          email: email,
          booking_date: `${date} ${time}`,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Lỗi khi lưu vào Supabase:', error);
      // Vẫn tiếp tục để gửi email nếu Supabase lỗi (chưa tạo bảng)
    }

    // 2. Gửi email xác nhận bằng Nodemailer
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"Auto Showroom" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: `Xác nhận đặt lịch xem xe - ${carModel}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #d97706;">
              <h2 style="color: #d97706; margin: 0;">XÁC NHẬN ĐẶT LỊCH XEM XE</h2>
            </div>
            
            <div style="padding: 20px 0;">
              <p>Chào <strong>${fullName}</strong>,</p>
              <p>Cảm ơn bạn đã tin tưởng và đặt lịch xem xe tại showroom của chúng tôi. Hệ thống đã ghi nhận lịch hẹn của bạn với thông tin chi tiết như sau:</p>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0;">🚗 <strong>Xe đăng ký xem:</strong> <span style="color: #d97706; font-weight: bold;">${carModel}</span></p>
                <p style="margin: 0 0 10px 0;">📅 <strong>Ngày hẹn:</strong> ${date}</p>
                <p style="margin: 0 0 10px 0;">⏰ <strong>Thời gian:</strong> ${time}</p>
                <p style="margin: 0 0 10px 0;">📞 <strong>Số điện thoại của bạn:</strong> ${phone}</p>
                <p style="margin: 0;">📍 <strong>Địa điểm:</strong> Showroom Auto, 123 Đường ABC, Quận XYZ, Hà Nội</p>
              </div>

              <p>Nếu có bất cứ thay đổi nào về lịch trình hoặc cần hỗ trợ thêm thông tin, xin vui lòng kết nối ngay với Hotline của chúng tôi: <strong style="color: #d97706; font-size: 18px;">0988.888.888</strong>.</p>
              <p>Chúng tôi rất mong được đón tiếp bạn tại showroom!</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #666; text-align: center;">
              <p style="margin: 0;">Trân trọng,</p>
              <p style="margin: 5px 0 0 0; font-weight: bold; color: #333;">Đội ngũ Auto Showroom</p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } else {
      console.warn("Chưa cấu hình SMTP_EMAIL và SMTP_PASSWORD trong .env.local, bỏ qua bước gửi mail.");
    }

    return NextResponse.json({ success: true, message: 'Đã lưu đặt lịch và gửi email' });
  } catch (error: any) {
    console.error('Lỗi API booking:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
