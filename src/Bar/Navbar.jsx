import { useLocation, useParams } from 'react-router-dom';
import { useState} from 'react';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const postId = params.pid;

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
      case '/checkfinditem':
        return 'รายการตามหาเจ้าของ';
      case `/posts/${postId}`:
        return 'รายการ';  
      case `/posts/edit/${postId}`:
        return 'รายการแก้ไข'; 
      case `/posts/editstaff/${postId}`:
        return 'รายการแก้ไขสำหรับเจ้าหน้าที่';    
        // หากไม่ตรงกับเงื่อนไขใดๆ ให้ใส่ชื่อเริ่มต้น
      default:
        return 'Crime Report System'; 
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const onBack = async () => { window.history.back();};

  return (
    <div>
      <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between">
        <div className="flex items-center">
          {(location.pathname === '/home' || location.pathname === '/staffhome') && (
            <img src="./logo.png" alt="Left Logo" className="h-7 w-7 ml-2 mr-3" />
          )}
          {location.pathname !== '/home' && location.pathname !== '/staffhome' && (
            <img onClick={onBack} src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fback.png?alt=media&token=be5b9983-b0ca-491c-9a8b-6103df36b632"}
            alt="Left Logo" className="h-5 w-5 ml-2 mr-3" />
            // <img onClick={onBack} src="./07.png" alt="Left Logo" className="h-5 w-5 ml-2 mr-3" />
          )}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white text-lg md:text-xl font-bold">{getNavbarTitle()}</p>
        </div>
        <div className="flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="mr-1 h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path fillRule ="evenodd" clipRule ="evenodd" d="M6 5h12v2H6V5zm0 6h12v2H6v-2zm12 7H6v-2h12v2z"/>
              ) : (
                <path fillRule="evenodd" clipRule ="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"/>
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed right-0 bg-opacity-50 flex justify-end items-center">
          <div className="bg-white w-50 p-1  shadow-lg">
            <ul>
              <li>
                <a href="/lostitem" className="block py-2 px-4 hover:bg-gray-200 rounded">รายการของหาย</a>
              </li>
              <li>
                <a href="/guide" className="block py-2 px-4 hover:bg-gray-200 rounded">แนะนำการใช้งาน</a>
              </li>
              <li>
                <a href="/about" className="block py-2 px-4 hover:bg-gray-200 rounded">เกี่ยวกับเรา</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
