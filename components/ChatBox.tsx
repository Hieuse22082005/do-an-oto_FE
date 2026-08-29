"use client";
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    { id: 'bot-1', sender: 'bot', text: 'Chào bạn! Mình là Trợ lý AI của ĐịnhGiáXe. Mình có thể giúp gì cho bạn hôm nay?' }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error('Lỗi kết nối máy chủ');
      const data = await response.json();
      
      setMessages(prev => [...prev, { id: `bot-${Date.now()}`, sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, sender: 'bot', text: 'Xin lỗi, AI đang bảo trì. Vui lòng thử lại sau!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      
      <div 
        className={`absolute bottom-20 right-0 w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-50 opacity-0 pointer-events-none'
        }`}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-slate-800 p-4 rounded-t-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 absolute bottom-0 right-0"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Trợ lý AI Định Giá</h3>
              <p className="text-gray-300 text-[10px] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Trực tuyến</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
        </div>

        {/* Nội dung Chat (Đã tích hợp Markdown) */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 text-sm shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-200'}`}>
                {msg.sender === 'user' ? (
                  msg.text 
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-blue-800" {...props} />,
                      table: ({node, ...props}) => <div className="overflow-x-auto mb-2"><table className="min-w-full text-xs text-left border-collapse border border-gray-200" {...props} /></div>,
                      th: ({node, ...props}) => <th className="border border-gray-200 bg-gray-100 px-2 py-1.5 font-bold" {...props} />,
                      td: ({node, ...props}) => <td className="border border-gray-200 px-2 py-1.5" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-gray-100 flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Khung nhập liệu */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 rounded-b-2xl flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhập câu hỏi..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
          <button type="submit" disabled={!input.trim() || isTyping} className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300">➤</button>
        </form>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl transition-transform hover:scale-105 active:scale-95 ${isOpen ? 'bg-gray-800 text-white rotate-90 scale-90' : 'bg-blue-600 text-white'}`}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}