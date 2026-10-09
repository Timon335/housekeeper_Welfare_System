import React from 'react';
import { WelfareProvider, useWelfare } from './context/WelfareContext';
import { Navbar } from './components/common/Navbar';
import { Toast } from './components/common/Toast';
import { LoginScreen } from './components/auth/LoginScreen';
import { HousekeeperLayout } from './components/housekeeper/HousekeeperLayout';
import { ManagerLayout } from './components/manager/ManagerLayout';
import { Database, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

/**
 * ==============================================================================
 * Main Content Component: ควบคุมการสลับหน้าระหว่าง Login, แม่บ้าน, และหัวหน้างาน
 * ==============================================================================
 */
const MainContent = () => {
  const { currentUser } = useWelfare();

  // หากยังไม่ได้เข้าสู่ระบบ ให้แสดงหน้าจอ Login Demo
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* แถบนำทางด้านบน */}
      <Navbar />

      {/* พื้นที่แสดงผลหลัก */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentUser.role === 'manager' ? (
          <ManagerLayout />
        ) : (
          <HousekeeperLayout />
        )}
      </div>

      {/* แถบคำอธิบายเชิงวิชาการสำหรับนำเสนออาจารย์ (IS Architecture Banner) */}
      <footer className="bg-white border-t border-[#E2E8F0] py-3 px-4 text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Database className="w-4 h-4 text-[#2563EB]" />
            <span>Relational Schema Architecture (In-Memory Transaction Simulated)</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>ระบบสวัสดิการแม่บ้านหอพัก • Design System: Welfare Care</span>
            <span>•</span>
            <span className="text-[#16A34A] font-semibold">พร้อม Deploy บน Vercel</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      <Toast />
    </div>
  );
};

/**
 * Root Application Component
 */
export default function App() {
  return (
    <WelfareProvider>
      <MainContent />
    </WelfareProvider>
  );
}
