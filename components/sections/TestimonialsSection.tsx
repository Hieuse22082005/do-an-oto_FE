'use client';

import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Sự minh bạch trong kiểm định khiến tôi cực kỳ yên tâm khi mua chiếc Mercedes ở đây. Quy trình chuyên nghiệp, nhanh gọn.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150",
    name: "Nguyễn Minh Tuấn",
    role: "Giám đốc",
    company: "TechCorp",
  },
  {
    quote: "Không ngờ mua xe lướt mà chất lượng chẳng kém gì xe mới. Chế độ bảo hành 12 tháng rất rõ ràng, không mập mờ.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=150&h=150",
    name: "Lê Hoàng Diệp Anh",
    role: "CEO",
    company: "Fashionista",
  },
  {
    quote: "Hỗ trợ trả góp siêu tốc. Từ lúc xem xe đến lúc nhận chìa khóa chưa đầy 24h. Cảm ơn đội ngũ nhân viên rất nhiệt tình.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=150&h=150",
    name: "Phạm Quốc Bảo",
    role: "Trưởng phòng",
    company: "VinaBank",
  },
  {
    quote: "Chất lượng xe đúng như cam kết, không một vết xước nhỏ. Tôi rất hài lòng về chiếc BMW X5 mua tại showroom.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=150&h=150",
    name: "Trần Anh Đức",
    role: "Kỹ sư",
    company: "Xây dựng Hòa Bình",
  },
  {
    quote: "Vợ chồng tôi tìm xe gia đình đã lâu nhưng mãi tới khi đến đây mới ưng ý. Nhân viên tư vấn rất có tâm.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=150&h=150",
    name: "Hoàng Thanh Mai",
    role: "Chủ doanh nghiệp",
    company: "",
  },
  {
    quote: "Sau 6 tháng chạy chiếc Porsche 911 mua tại đây, xe vẫn bốc và êm. Quá trình bảo dưỡng cũng cực kỳ chu đáo.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150",
    name: "Lý Gia Thành",
    role: "Nhà đầu tư",
    company: "VinCapital",
  },
  {
    quote: "Tôi đã giới thiệu 3 người bạn qua đây mua xe và ai cũng ưng ý. Chất lượng là thứ giữ chân khách hàng tốt nhất.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=150&h=150",
    name: "Vũ Phương Thảo",
    role: "Giám đốc Marketing",
    company: "MediaZ",
  },
  {
    quote: "Hồ sơ pháp lý rõ ràng, không giấu giếm bất cứ lịch sử nào của xe. Một địa chỉ đáng tin cậy cho dân chơi xe.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150",
    name: "Đặng Quang Hùng",
    role: "Founder",
    company: "StartUp Club",
  },
  {
    quote: "Dịch vụ đẳng cấp! Xe trước khi giao được spa kỹ lưỡng, thơm phức. Cảm giác mua xe lướt mà sướng như mua xe đập hộp.",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef43ce90d?fit=crop&w=150&h=150",
    name: "Bùi Bích Thủy",
    role: "Trưởng phòng Nhân sự",
    company: "Tập đoàn ABC",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="relative py-20 bg-slate-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-20">
        <div className="mx-auto flex flex-col items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[1px] w-12 bg-blue-900"></div>
            <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Đánh giá thực tế</span>
            <div className="h-[1px] w-12 bg-blue-900"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-slate-800 text-center">
            Khách hàng nói gì?
          </h2>
          <p className="text-center text-slate-500 max-w-xl">
            Sự hài lòng của khách hàng là minh chứng rõ ràng nhất cho chất lượng và uy tín của chúng tôi.
          </p>
        </div>

        <div
          className={cn(
            "mt-10 flex h-[600px] justify-center gap-6 overflow-hidden",
            "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
          )}
        >
          <InfiniteSlider direction="vertical" speed={30} speedOnHover={100} className="w-full md:w-1/3">
            {firstColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden md:flex w-1/3"
            direction="vertical"
            speed={50}
            speedOnHover={100}
          >
            {secondColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden lg:flex w-1/3"
            direction="vertical"
            speed={35}
            speedOnHover={100}
          >
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role, company } = testimonial;
  return (
    <figure
      className={cn(
        "w-full rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer",
        className,
      )}
      {...props}
    >
      <blockquote className="text-slate-700 text-sm md:text-base leading-relaxed italic mb-6">"{quote}"</blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar className="size-12 rounded-full ring-2 ring-slate-100">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-bold not-italic text-slate-800">
            {name}
          </cite>
          <span className="text-slate-500 text-xs">
            {role} {company && `· ${company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
