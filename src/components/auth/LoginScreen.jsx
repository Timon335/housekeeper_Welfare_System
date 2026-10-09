import React, { useState } from 'react';
import { useWelfare } from '../../context/WelfareContext';
import { ShieldCheck, UserCheck, Key, ArrowRight, Sparkles, Building2, Heart } from 'lucide-react';

/**
 * ==============================================================================
 * Component: LoginScreen
 * ==============================================================================
 * [A] หน้าเข้าสู่ระบบ (Easy Testing & Demo Mode):
 * 1. มี Tab ให้สลับเลือกระหว่าง "สำหรับแม่บ้าน (Housekeeper)" และ "สำหรับหัวหน้างาน (Manager)"
 * 2. มีปุ่ม Quick Demo Account ให้คลิกเลือกบัญชีทดสอบได้ทันที เช่น พี่สมศรี, พี่สมพร, พี่บัวลอย, หัวหน้าพรทิพย์
 * 3. Auto-fill รหัสผ่านให้อัตโนมัติเมื่อเลือกบัญชี เพื่อให้อาจารย์และผู้ประเมินทดสอบได้ลื่นไหล ไม่ต้องพิมพ์เอง
 * 4. ใส่ Comment ภาษาไทยอธิบายการทำงานเพื่อเตรียมตอบคำถามวิชา Information Systems
 * ==============================================================================
 */
export const LoginScreen = () => {
  const { users, login } = useWelfare();

  // State สำหรับแท็บประเภทผู้ใช้ ('housekeeper' | 'manager')
  const [activeTab, setActiveTab] = useState('housekeeper');

  // State สำหรับเก็บ User ID ที่ถูกเลือก
  const [selectedUserId, setSelectedUserId] = useState('HK01');

  // State สำหรับฟอร์มกรอกรหัสผ่าน (Auto-filled)
  const [password, setPassword] = useState('password123');

  // กรองรายชื่อผู้ใช้ตามแท็บที่เลือก
  const filteredUsers = users.filter((u) => u.role === activeTab);

  // ฟังก์ชันเมื่อคลิกเลือกบัญชีจำลอง (Quick Demo Card)
  const handleSelectAccount = (user) => {
    setSelectedUserId(user.id);
    setPassword(user.demoPassword || 'password123');
  };

  // สลับแท็บ และเลือกบัญชีแรกของกลุ่มนั้นทันที
  const handleTabChange = (role) => {
    setActiveTab(role);
    const firstOfRole = users.find((u) => u.role === role);
    if (firstOfRole) {
      setSelectedUserId(firstOfRole.id);
      setPassword(firstOfRole.demoPassword || 'password123');
    }
  };

  // ฟังก์ชันกดยืนยันเข้าสู่ระบบ
  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedUserId);
  };

  // ดึงข้อมูล User ที่กำลังเลือกอยู่ในขณะนี้
  const currentSelectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#CCFBF1] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden">
        
        {/* Header สวยงามตาม Design System "Welfare Care" */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#0D9488] p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welfare Care</h1>
          <p className="text-sm text-blue-100 font-light mt-1">
            ระบบจัดการสวัสดิการและสิทธิประโยชน์ของแม่บ้านหอพัก
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs text-white">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Information Systems Project Demo Mode</span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          
          {/* [TAB 1 & 2] เลือกระหว่าง แม่บ้าน vs หัวหน้างาน */}
          <div className="flex bg-[#F1F5F9] p-1.5 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => handleTabChange('housekeeper')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'housekeeper'
                  ? 'bg-white text-[#2563EB] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span>สำหรับแม่บ้าน (Housekeeper)</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('manager')}
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'manager'
                  ? 'bg-white text-[#2563EB] shadow-sm'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#0D9488]" />
              <span>สำหรับหัวหน้างาน (Manager)</span>
            </button>
          </div>

          {/* คำแนะนำ Quick Demo */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
              {activeTab === 'housekeeper' ? 'เลือกบัญชีแม่บ้านทดสอบ:' : 'เลือกบัญชีหัวหน้างาน:'}
            </span>
            <span className="text-xs text-[#2563EB] font-medium">คลิกเพื่อ Auto-fill ข้อมูล</span>
          </div>

          {/* Quick Demo Account Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            {filteredUsers.map((user) => {
              const isSelected = user.id === selectedUserId;
              return (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectAccount(user)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#DBEAFE]/40 ring-2 ring-[#2563EB]'
                      : 'border-[#E2E8F0] hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#0F172A] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#64748B]">รหัส {user.staffId}</p>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#64748B] bg-white/70 px-2 py-0.5 rounded border border-slate-200">
                    {user.role === 'manager' ? 'ผู้จัดการหอพัก' : user.shift?.split(' ')[0] || 'แม่บ้าน'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ฟอร์มเข้าสู่ระบบ (จำลองพร้อม Auto-fill) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                บัญชีผู้ใช้งานที่เลือก
              </label>
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <img
                  src={currentSelectedUser?.avatar}
                  alt={currentSelectedUser?.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0F172A]">
                    {currentSelectedUser?.name}
                  </div>
                  <div className="text-xs text-[#64748B]">
                    ตำแหน่ง: {currentSelectedUser?.position} (รหัส: {currentSelectedUser?.staffId})
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  รหัสผ่าน (Auto-filled สำหรับ Demo)
                </label>
                <span className="text-[11px] text-[#16A34A] font-medium">✓ เติมรหัสอัตโนมัติแล้ว</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-transparent outline-none transition-all"
                  placeholder="รหัสผ่าน"
                  required
                />
              </div>
            </div>

            {/* ปุ่มกดเข้าสู่ระบบ */}
            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 text-sm"
            >
              <span>เข้าสู่ระบบเป็น {currentSelectedUser?.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* ข้อมูลสรุปเชิงระบบสำหรับอาจารย์ */}
          <div className="mt-6 pt-4 border-t border-[#E2E8F0] text-center">
            <p className="text-xs text-[#64748B]">
              ระบบเชื่อมต่อแบบ Relational In-Memory Database พร้อมสลับบทบาททดสอบได้ทันที
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
