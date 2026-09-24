"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, Mail, Car, Loader2, CheckCircle2 } from 'lucide-react';

import { apiService } from '../../services/api';

interface BookingModalProps {
  car: any;
  onClose: () => void;
}

export default function BookingModal({ car, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '09:00',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    try {
      const res = await apiService.bookCarViewing({
        carId: car?.id,
        carModel: car?.model,
        ...formData
      });
      
      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
      } else {
        setErrorMsg('Có lỗi xảy ra, vui lòng thử lại!');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Không thể kết nối đến Backend!');
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
            <Calendar size={24} /> Đặt lịch xem xe
          </h2>
          <p className="text-amber-100 text-sm">Điền thông tin để chúng tôi phục vụ bạn tốt nhất</p>
        </div>

        {success ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Đặt lịch thành công!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Cảm ơn <strong>{formData.fullName}</strong>. Chúng tôi đã gửi một email xác nhận đến <strong>{formData.email}</strong>. Vui lòng kiểm tra hộp thư của bạn.
            </p>
            <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
              Hotline hỗ trợ: <strong className="text-amber-600">0988.888.888</strong>
            </p>
            <button 
              onClick={onClose}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            
            {/* Selected Car Info */}
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Car size={24} />
              </div>
              <div>
                <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">Xe bạn muốn xem</p>
                <p className="text-lg font-bold text-slate-900">{car?.model}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Họ và tên</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="Nhập họ và tên của bạn"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Số điện thoại</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Số điện thoại"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Email (Nhận xác nhận)</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email của bạn"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Ngày xem xe</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Thời gian</label>
                  <div className="relative">
                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all appearance-none"
                    >
                      <option value="08:00">08:00 Sáng</option>
                      <option value="09:00">09:00 Sáng</option>
                      <option value="10:00">10:00 Sáng</option>
                      <option value="11:00">11:00 Sáng</option>
                      <option value="14:00">14:00 Chiều</option>
                      <option value="15:00">15:00 Chiều</option>
                      <option value="16:00">16:00 Chiều</option>
                      <option value="17:00">17:00 Chiều</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold uppercase tracking-widest rounded-lg hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Calendar size={20} />}
              Xác nhận đặt lịch
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
