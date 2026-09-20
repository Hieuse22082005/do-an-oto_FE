'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Car, Globe, Settings, Gauge, Users, Heart, ArrowRight, ChevronLeft, Loader2, CheckCircle2, ShieldCheck, Clock, CreditCard, Star, MessageSquareQuote, Check } from 'lucide-react';
import CarDetailModal from '../modals/CarDetailModal';
import TestimonialsSection from '../sections/TestimonialsSection';
import ContactSupportBlock from '../ui/contact-support-block';
import { InfiniteSlider } from '../ui/infinite-slider';

// Animation variants for scroll reveal
const fadeUpVariant: any = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const mockListings = [
  {
    id: 'mock-1',
    brand: 'Honda',
    model: 'CIVIC 11TH GEN',
    condition: 'XE LƯỚT',
    manufacture_year: 2023,
    buy_price: 25000,
    sell_price: 35000,
    status: 'available',
    category: 'Xe gia đình',
    image_url: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200',
    description: 'A balance of innovation and heritage. Engineered for those who appreciate performance, design, and purpose.'
  },
  {
    id: 'mock-2',
    brand: 'BMW',
    model: 'M4 COMPETITION',
    condition: 'MỚI 100%',
    manufacture_year: 2024,
    buy_price: 75000,
    sell_price: 85000,
    status: 'available',
    category: 'Thể thao',
    image_url: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200',
    description: 'Unleash the ultimate driving machine. Precision engineering meets track-ready performance.'
  },
  {
    id: 'mock-3',
    brand: 'Mercedes',
    model: 'G-CLASS 63',
    condition: 'MỚI 100%',
    manufacture_year: 2024,
    buy_price: 150000,
    sell_price: 180000,
    status: 'sold',
    category: 'SUV & Crossover',
    image_url: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
    description: 'Iconic design, legendary off-road capabilities, and unmatched luxury.'
  }
];

const categories = ['Tất cả', 'Xe sang', 'Xe gia đình', 'SUV & Crossover', 'Thể thao'];

export default function MarketplaceTab({ user }: { user?: any }) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [showAllCars, setShowAllCars] = useState(false);
  
  // Slider ref for horizontal scroll
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/v1/cars');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data && data.length > 0) {
        setListings([...data, ...mockListings.filter(m => !data.find((d:any) => d.model === m.model))]);
      } else {
        setListings(mockListings);
      }
    } catch (err) {
      console.error("Error fetching listings from API:", err);
      setListings(mockListings);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  const handleUpdateStatus = async (carId: string, newStatus: string) => {
    if (carId.startsWith('mock-')) {
      alert("Đã cập nhật trạng thái trên xe mẫu thành công!");
      setSelectedCar(null);
      setListings(listings.map(c => c.id === carId ? { ...c, status: newStatus } : c));
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/cars/${carId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('API Error');
      
      alert(`Thành công! Xe đã được xác nhận mua.`);
      setSelectedCar(null);
      fetchListings();
    } catch (error) {
      console.error('Error updating status via API:', error);
      alert('Có lỗi xảy ra khi cập nhật!');
    }
  };

  let filteredListings = listings;
  if (activeCategory !== 'Tất cả' && activeCategory !== 'Táº¥t cáº£') {
    filteredListings = filteredListings.filter(car => car.category === activeCategory || (!car.category && activeCategory === 'Xe sang'));
  }
  if (activeBrand) {
    filteredListings = filteredListings.filter(car => car.brand && car.brand.toLowerCase() === activeBrand.toLowerCase());
  }

  return (
    <div className="w-full flex flex-col bg-white font-sans text-slate-800">
      
      {/* 1. HERO SECTION WITH VIDEO */}
      <section className="relative w-full h-[80vh] flex items-center overflow-hidden bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src="/13795917-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>

        <div className="w-full md:w-[60%] px-10 md:px-20 z-10 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl md:text-7xl font-light leading-tight mb-2 drop-shadow-lg">
              SmartCar <br />
              <span className="font-serif italic text-amber-500">Premium</span> <br />
              <span className="font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Collection</span>
            </h1>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => {
                  document.getElementById('collection-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-red-600 text-white hover:bg-red-700 transition-all rounded-sm text-sm font-bold uppercase"
              >
                Khám Phá Ngay
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* 1.5 CATEGORIES & COUNTRIES */}
      <section className="w-full py-16 px-6 md:px-10 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Bộ sưu tập</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Thế Giới Xe Đa Dạng</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Từ những mẫu Sedan thanh lịch đến SUV mạnh mẽ, quy tụ các thương hiệu danh tiếng nhất toàn cầu.</p>
          </motion.div>

          <div className="mb-16">
            <h4 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 justify-center">
              <Car className="text-blue-600" /> Thương hiệu nổi bật
            </h4>
            
            <InfiniteSlider direction="horizontal" speed={25} reverse={true}>
              {[
                { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
                { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
                { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
                { name: 'Porsche', logo: 'https://cdn.worldvectorlogo.com/logos/porsche-6.svg' },
                { name: 'Lexus', logo: 'https://cdn.worldvectorlogo.com/logos/lexus-2.svg' },
                { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
                { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
                { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' },
                { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
                { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo2.svg' },
                { name: 'VinFast', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Vinfast_logo.svg' },
              ].map((brand) => (
                <div 
                  key={brand.name} 
                  className="flex flex-col items-center justify-center h-24 w-32 md:w-40 mx-4"
                >
                  <img src={brand.logo} alt={brand.name} className="h-16 w-auto object-contain mb-4 opacity-90 drop-shadow-md" />
                  <h4 className="text-slate-700 font-bold text-sm tracking-wide">{brand.name}</h4>
                </div>
              ))}
            </InfiniteSlider>
          </div>

          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2 justify-center">
              <Globe className="text-blue-600" /> Quốc gia xuất xứ
            </h4>
            
            <InfiniteSlider direction="horizontal" speed={20} reverse={true}>
              {[
                { name: 'Đức', flag: 'https://flagcdn.com/w80/de.png', brands: 'Mercedes, BMW, Audi, Porsche' },
                { name: 'Nhật Bản', flag: 'https://flagcdn.com/w80/jp.png', brands: 'Toyota, Lexus, Honda, Mazda' },
                { name: 'Mỹ', flag: 'https://flagcdn.com/w80/us.png', brands: 'Ford, Chevrolet, Tesla, Jeep' },
                { name: 'Ý', flag: 'https://flagcdn.com/w80/it.png', brands: 'Ferrari, Lamborghini, Maserati' },
                { name: 'Anh Quốc', flag: 'https://flagcdn.com/w80/gb.png', brands: 'Bentley, Land Rover, Aston Martin' },
                { name: 'Pháp', flag: 'https://flagcdn.com/w80/fr.png', brands: 'Peugeot, Bugatti, Renault' },
                { name: 'Hàn Quốc', flag: 'https://flagcdn.com/w80/kr.png', brands: 'Hyundai, Kia, Genesis' },
                { name: 'Thụy Điển', flag: 'https://flagcdn.com/w80/se.png', brands: 'Volvo, Koenigsegg' },
                { name: 'Việt Nam', flag: 'https://flagcdn.com/w80/vn.png', brands: 'VinFast' },
              ].map((country) => (
                <div 
                  key={country.name} 
                  className="flex flex-col items-center justify-center h-24 w-36 md:w-48 mx-4"
                >
                  <img src={country.flag} alt={country.name} className="w-14 h-auto shadow-md rounded-sm mb-4" />
                  <h4 className="text-slate-700 font-bold mb-1 tracking-wide">{country.name}</h4>
                  <p className="text-slate-400 text-[10px] uppercase font-mono">{country.brands}</p>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>
      {/* 2. CAM KẾT CỦA CHÚNG TÔI */}
      <section className="w-full py-20 px-6 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Cam kết của chúng tôi</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">Tại sao chọn SmartCar?</h2>
            <p className="text-slate-500 mt-4">Chúng tôi xây dựng niềm tin bằng quy trình, không phải lời hứa suông.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Card 1 */}
            <motion.div variants={fadeUpVariant} className="border border-slate-200 rounded-lg p-6 hover:shadow-xl transition-shadow bg-white relative overflow-hidden group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={24} />
              </div>
              <div className="absolute top-6 right-6 text-right">
                <span className="text-3xl font-light text-slate-300 group-hover:text-blue-100 transition-colors">160</span>
                <p className="text-[10px] uppercase text-slate-400">Điểm kiểm định</p>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Kiểm định 160 điểm</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Quy trình kiểm tra kỹ thuật nghiêm ngặt trước khi nhận xe vào hệ thống.</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={fadeUpVariant} className="border border-slate-200 rounded-lg p-6 hover:shadow-xl transition-shadow bg-white relative overflow-hidden group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div className="absolute top-6 right-6 text-right">
                <span className="text-3xl font-light text-slate-300 group-hover:text-blue-100 transition-colors">12</span>
                <p className="text-[10px] uppercase text-slate-400">Tháng bảo hành</p>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Bảo hành 12 tháng</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Bảo hành toàn diện 12 tháng hoặc 20.000 km — không điều kiện ẩn.</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUpVariant} className="border border-slate-200 rounded-lg p-6 hover:shadow-xl transition-shadow bg-white relative overflow-hidden group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div className="absolute top-6 right-6 text-right">
                <span className="text-3xl font-light text-slate-300 group-hover:text-blue-100 transition-colors">100%</span>
                <p className="text-[10px] uppercase text-slate-400">Sạch sẽ</p>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Cam kết minh bạch</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Lịch sử xe rõ ràng — không đâm đụng, không ngập nước, không phục chế.</p>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={fadeUpVariant} className="border border-slate-200 rounded-lg p-6 hover:shadow-xl transition-shadow bg-white relative overflow-hidden group">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 transition-transform">
                <CreditCard size={24} />
              </div>
              <div className="absolute top-6 right-6 text-right">
                <span className="text-3xl font-light text-slate-300 group-hover:text-blue-100 transition-colors">70%</span>
                <p className="text-[10px] uppercase text-slate-400">Giá trị xe</p>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Hỗ trợ trả góp 70%</h3>
              <p className="text-sm text-slate-500 leading-relaxed">12 ngân hàng đối tác, lãi suất ưu đãi, phê duyệt trong 24 giờ.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. BỘ SƯU TẬP - XE NỔI BẬT */}
      <section id="collection-section" className="w-full py-24 px-6 md:px-10 lg:px-20 bg-slate-50">
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col mb-12 gap-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-blue-900 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Collection</span>
                <h2 className="text-4xl md:text-5xl font-serif text-slate-800">Featured Luxury Cars</h2>
              </div>
              
              <button 
                onClick={() => setShowAllCars(!showAllCars)}
                className="text-blue-900 hover:text-red-600 font-bold tracking-widest uppercase text-xs transition-colors flex items-center gap-2"
              >
                {showAllCars ? 'Lesser Inventory' : 'View All Inventory'} 
                <ArrowRight size={14} className={showAllCars ? 'rotate-90 transition-transform' : 'transition-transform'} />
              </button>
            </div>
          </motion.div>

          {/* Categories & Brand Filter */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10"
          >
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveBrand(null);
                    setShowAllCars(true);
                  }}
                  className={`px-6 py-2 border rounded-full transition-all font-medium text-xs tracking-wider uppercase ${
                    activeCategory === cat 
                      ? 'bg-blue-900 text-white border-blue-900 shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-900 hover:text-blue-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Brand Filter Dropdown */}
            <div className="relative min-w-[200px]">
              <select
                value={activeBrand || ''}
                onChange={(e) => {
                  setActiveBrand(e.target.value || null);
                  setShowAllCars(true);
                }}
                className="w-full appearance-none px-6 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-xs tracking-wider uppercase outline-none focus:border-blue-900 cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <option value="">Tất cả hãng xe</option>
                {Array.from(new Set(listings.map(car => car.brand).filter(Boolean))).sort().map(brand => (
                  <option key={brand as string} value={brand as string}>{brand as string}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-blue-900 text-[10px]">
                ▼
              </div>
            </div>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-amber-500" />
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode='popLayout'>
                {filteredListings.length === 0 ? (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-slate-500 italic col-span-full py-10"
                  >
                    Không tìm thấy xe nào trong danh mục này.
                  </motion.p>
                ) : (
                  (showAllCars ? filteredListings : filteredListings.slice(0, 3)).map((car) => {
                    const isSold = car.status === 'sold';
                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        key={car.id} 
                        className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-900/30 transition-all group flex flex-col relative"
                      >
                        {/* Heart Icon */}
                        <button className="absolute top-4 left-4 z-20 text-white/80 hover:text-red-500 transition-colors drop-shadow-md">
                          <Heart size={20} strokeWidth={1.5} />
                        </button>

                        {/* Image */}
                        <div className="w-full aspect-[16/10] bg-black relative overflow-hidden">
                          <img 
                            src={car.image_url} 
                            alt={car.model} 
                            className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${isSold ? 'grayscale opacity-50' : 'opacity-90'}`}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                          
                          {/* Sold Badge */}
                          {isSold && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-blur-[2px]">
                              <div className="px-6 py-2 bg-red-600 text-white font-black text-xl tracking-widest uppercase -rotate-12 border-4 border-red-600 shadow-2xl">
                                Đã Bán
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                          <div className="flex justify-between items-end mb-4">
                            <div>
                              <h3 className="font-black text-xl text-slate-800 tracking-tight">{car.brand} {car.model}</h3>
                            </div>
                            <p className="font-bold text-red-600 text-lg">
                              {formatPrice(car.sell_price)}
                            </p>
                          </div>
                          
                          {/* Specs Row */}
                          <div className="flex items-center justify-between text-slate-500 text-[11px] font-bold uppercase tracking-wider py-4 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <Settings size={14} className="text-blue-900"/>
                              <span>{car.brand.toLowerCase() === 'porsche' ? 'Flat-6 4.0L' : car.brand.toLowerCase() === 'audi' ? 'Electric' : 'V8 4.0L'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Gauge size={14} className="text-blue-900"/>
                              <span>{car.brand.toLowerCase() === 'porsche' ? '520 HP' : '600 HP'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-blue-900"/>
                              <span>4 Seats</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => !isSold && setSelectedCar(car)}
                            disabled={isSold}
                            className={`w-full pt-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex justify-between items-center ${
                              isSold 
                                ? 'text-slate-400 cursor-not-allowed'
                                : 'text-blue-900 hover:text-red-600 group-hover:text-red-600'
                            }`}
                          >
                            {isSold ? 'Out of Stock' : 'View Details'}
                            <ArrowRight size={14} className={isSold ? 'opacity-30' : 'group-hover:translate-x-1 transition-transform'} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      {/* 4. QUY TRÌNH */}
      <section className="w-full py-20 px-6 md:px-10 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
            className="w-full lg:w-1/3"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Quy trình</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-slate-800 leading-tight mb-6">Từ tuyển chọn đến bàn giao</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Quy trình chuẩn hóa giúp mỗi chiếc xe đến tay khách hàng đều đạt chất lượng như mong đợi — không phụ thuộc vào cảm tính của nhân viên bán hàng.
            </p>
            <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30">
              Đặt lịch tư vấn miễn phí
            </button>
          </motion.div>

          {/* Right Steps */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {[
              { num: '01', title: 'Tuyển chọn kỹ', desc: 'Chúng tôi chỉ nhận xe đạt tiêu chí: không tai nạn, không ngập nước, nguồn gốc rõ ràng.' },
              { num: '02', title: 'Kiểm định 160 điểm', desc: 'Đội ngũ kỹ thuật độc lập kiểm tra toàn diện từ động cơ, khung gầm đến hệ thống điện.' },
              { num: '03', title: 'Hoàn thiện & Định giá', desc: 'Xe được vệ sinh chi tiết, chụp ảnh chuẩn, định giá minh bạch dựa trên thị trường thực tế.' },
              { num: '04', title: 'Bàn giao & Hậu mãi', desc: 'Giao xe kèm hồ sơ đầy đủ, bảo hành 12 tháng, hỗ trợ kỹ thuật 24/7.' }
            ].map((step, index) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex items-start gap-6 p-6 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full border-2 border-blue-900/20 flex items-center justify-center text-blue-900 font-serif text-xl bg-white">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. STATS & TESTIMONIALS */}
      <section className="w-full flex flex-col relative pt-10">
        
        {/* Stats Bar */}
        <div className="w-full bg-blue-900 text-white py-16 px-6 relative z-10 shadow-2xl">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="text-3xl md:text-5xl font-light mb-2">500+</div>
              <div className="text-xs md:text-sm text-blue-200 uppercase tracking-wider">Xe đã giao thành công</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="text-3xl md:text-5xl font-light mb-2">12+</div>
              <div className="text-xs md:text-sm text-blue-200 uppercase tracking-wider">Năm kinh nghiệm</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="text-3xl md:text-5xl font-light mb-2">98%</div>
              <div className="text-xs md:text-sm text-blue-200 uppercase tracking-wider">Khách hàng hài lòng</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariant}>
              <div className="text-3xl md:text-5xl font-light mb-2">24h</div>
              <div className="text-xs md:text-sm text-blue-200 uppercase tracking-wider">Phê duyệt trả góp</div>
            </motion.div>
          </div>
        </div>

        {/* Testimonials Animation */}
        <div className="w-full bg-slate-50 relative -mt-10 pt-10">
          <TestimonialsSection />
        </div>
      </section>

      {/* 6. SUPPORT & CTA */}
      <section className="w-full py-24 px-6 md:px-10 flex justify-center bg-white relative overflow-hidden">
        {/* Background blobs for luxury feel */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left CTA Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-blue-900"></div>
              <span className="text-blue-900 font-bold uppercase tracking-wider text-sm">Hỗ trợ 24/7</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-6 leading-tight">
              Chưa tìm được xe ưng ý?
            </h2>
            
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-lg">
              Đừng lo lắng! Đội ngũ chuyên gia của SmartCar luôn sẵn sàng lắng nghe nhu cầu của bạn. 
              Hãy gửi yêu cầu hỗ trợ hoặc gọi ngay Hotline để được tư vấn hoàn toàn miễn phí.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button className="px-8 py-4 bg-red-600 text-white rounded-md font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 whitespace-nowrap text-base flex items-center justify-center gap-2">
                 Gọi Hotline: 1800.8888
              </button>
              <button className="px-8 py-4 bg-blue-900 text-white rounded-md font-bold hover:bg-blue-950 transition-colors shadow-lg shadow-blue-900/30 whitespace-nowrap text-base flex items-center justify-center gap-2">
                Xem tất cả xe <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Right Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <ContactSupportBlock />
          </motion.div>
          
        </div>
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedCar && (
          <CarDetailModal 
            car={selectedCar} 
            onClose={() => setSelectedCar(null)} 
            onBuy={() => handleUpdateStatus(selectedCar.id, 'sold')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
