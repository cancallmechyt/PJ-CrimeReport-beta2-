import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // กำหนดชื่อของ Navbar ตามหน้าที่อยู่ปัจจุบัน
  const getNavbarTitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'หน้าหลัก';
      case '/profile':
        return 'โปรไฟล์';
      case '/list':
        return 'รายการของฉัน';
      case '/form':
        return 'ฟอร์มสำหรับแจ้งเหตุ';
      case '/lostitem':
        return 'รายการของหายทั้งหมด';
      case '/finditem':
        return 'รายการของหายทั้งหมด';
      case '/formlostitem':
        return 'แจ้งของหาย/ตามหาของ';  
      case '/guide':
        return 'แนะนำการใช้งาน';  
      case '/about':
        return 'เกี่ยวกับเรา'; 
      case '/staffhome':
        return 'หน้าสำหรับเจ้าหน้าที่';     
      case '/emergency':
        return 'แจ้งเหตุฉุกเฉิน/กิจกรรม';
      case '/checklist':
        return 'รายการรับแจ้งเหตุ';
        // หากไม่ตรงกับเงื่อนไขใดๆ ให้ใส่ชื่อเริ่มต้น
      default:
        return 'Crime Reporting System'; 
    }
  };

  return (
    <div>
      <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between">
        <div className="flex items-center">
          <img src="./logo.png" alt="Logo" className="h-7 w-7 ml-2 mr-3" />
            <p className="text-white text-lg md:text-xl font-bold">{getNavbarTitle()}</p>
        </div>
        <div className="flex items-center justify-center flex-1">
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
