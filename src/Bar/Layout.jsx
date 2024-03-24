import Navbar from './Navbar'; // ปรับเปลี่ยนตามโครงสร้างของโปรเจ็กต์
import Footer from './Footer'; // ปรับเปลี่ยนตามโครงสร้างของโปรเจ็กต์
import PropTypes from 'prop-types'; // import PropTypes เพื่อใช้ในการตรวจสอบ props

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

// เพิ่ม propTypes สำหรับ children เพื่อให้ระบบตรวจสอบ props ให้ถูกต้อง
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;