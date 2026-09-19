"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Paperclip,
  CheckCircle,
  Loader2,
  PhoneCall,
  User,
  Mail,
} from "lucide-react";

const TOPICS = [
  "Tư vấn mua xe",
  "Hỗ trợ trả góp",
  "Bảo hành & Bảo dưỡng",
  "Hỗ trợ kỹ thuật",
  "Phản hồi / Góp ý",
];

const FAQS = [
  {
    question: "Làm thế nào để đặt lịch xem xe?",
    answer:
      "Bạn có thể liên hệ trực tiếp qua số Hotline hoặc điền form yêu cầu tư vấn, chúng tôi sẽ gọi lại ngay.",
  },
  {
    question: "Thủ tục trả góp cần những gì?",
    answer:
      "Bạn chỉ cần chuẩn bị CCCD, Sổ hộ khẩu và Hợp đồng lao động. Nhân viên ngân hàng sẽ hỗ trợ phần còn lại.",
  },
  {
    question: "Xe mua tại SmartCar được bảo hành bao lâu?",
    answer: "Tất cả xe bán ra đều được bảo hành động cơ và hộp số 12 tháng hoặc 20.000km tùy điều kiện nào đến trước.",
  },
  {
    question: "Tôi có thể bán lại xe cho showroom không?",
    answer: "Có, SmartCar có chính sách thu mua lại xe với giá chiết khấu ưu đãi cho khách hàng cũ.",
  },
];

function getRelatedFaqs(query: string) {
  if (!query.trim()) return [];
  return FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);
}

const ContactSupportBlock = () => {
  const [step, setStep] = useState(1);
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);
  const [error, setError] = useState("");

  const relatedFaqs = getRelatedFaqs(message);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && !topic) {
      setError("Vui lòng chọn một chủ đề.");
      return;
    }
    if (step === 2 && !message.trim()) {
      setError("Vui lòng mô tả vấn đề của bạn.");
      return;
    }
    if (step === 4 && (!name.trim() || !email.trim())) {
      setError("Vui lòng nhập tên và email của bạn.");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setTicket(`#${Math.floor(10000 + Math.random() * 90000)}`);
      setSubmitting(false);
      setStep(5);
    }, 1200);
  };

  if (step === 5 && ticket) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <CheckCircle className="h-16 w-16 text-green-600 mb-2" />
          <div className="text-green-600 font-bold text-2xl">
            Gửi yêu cầu thành công!
          </div>
          <div className="text-slate-600 text-center leading-relaxed">
            Mã yêu cầu hỗ trợ của bạn là <span className="font-bold text-slate-900">{ticket}</span>.
            <br />
            Đội ngũ CSKH của SmartCar sẽ liên hệ lại với bạn trong thời gian sớm nhất.
          </div>
          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setStep(1);
                setTicket(null);
                setTopic("");
                setMessage("");
                setFile(null);
                setName("");
                setEmail("");
              }}
              className="w-full"
            >
              Gửi thêm yêu cầu
            </Button>
            <Button variant="ghost" className="w-full text-slate-500">Trở về trang chủ</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto flex flex-col gap-2">
      <CardTitle className="flex items-center gap-3 text-2xl text-blue-900 border-b border-slate-100 pb-4">
        <PhoneCall className="text-blue-600" /> Liên hệ Hỗ trợ
      </CardTitle>
      <CardContent className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <label className="font-bold text-slate-700">Chúng tôi có thể giúp gì cho bạn?</label>
              <div className="flex flex-wrap gap-3">
                {TOPICS.map((t) => (
                  <Button
                    className="grow rounded-full transition-all"
                    key={t}
                    type="button"
                    variant={topic === t ? "default" : "outline"}
                    onClick={() => setTopic(t)}
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <label className="font-bold text-slate-700">Mô tả vấn đề của bạn</label>
              <Textarea
                placeholder="Vui lòng cung cấp chi tiết..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="resize-none"
              />
              {relatedFaqs.length > 0 && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg flex flex-col gap-2 p-4">
                  <div className="font-bold text-sm text-blue-900">
                    Câu hỏi thường gặp liên quan:
                  </div>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    {relatedFaqs.map((faq, i) => (
                      <li key={i} className="text-sm text-slate-600 leading-relaxed">
                        <span className="font-semibold text-slate-700">{faq.question}</span><br />
                        {faq.answer}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <label className="font-bold text-slate-700">Đính kèm tệp (Không bắt buộc)</label>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-2 py-8 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Paperclip className="h-5 w-5 mr-2" />{" "}
                  {file ? file.name : "Tải lên hình ảnh hoặc tài liệu"}
                </Button>
                {file && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
                    onClick={() => setFile(null)}
                  >
                    Xóa tệp
                  </Button>
                )}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="flex flex-col gap-4">
              <label className="font-bold text-slate-700">Thông tin liên lạc</label>
              <Input
                leftIcon={<User />}
                placeholder="Họ và Tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                leftIcon={<Mail />}
                type="email"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
            {step > 1 && step < 5 && (
              <Button type="button" variant="outline" className="w-1/3" onClick={handlePrev}>
                Quay lại
              </Button>
            )}
            {step < 4 && (
              <Button type="button" className={step > 1 ? "w-2/3" : "w-full"} onClick={handleNext}>
                Tiếp tục
              </Button>
            )}
            {step === 4 && (
              <Button type="submit" className="w-2/3 bg-blue-600 hover:bg-blue-700" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Đang gửi...
                  </>
                ) : (
                  "Gửi Yêu Cầu"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSupportBlock;
