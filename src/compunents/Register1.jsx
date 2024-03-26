import { useEffect, useState } from 'react';
import liff from "@line/liff";
import useAxios from '../useAxios'; 

function Register1() {
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({ liffId: '2003845535-ZB3wNLYm' });
                if (!liff.isLoggedIn()) {
                    liff.login();                    
                } else {
                    const userProfile = await liff.getProfile();
                    setProfile(userProfile);
                }
            } catch (e) {console.log("")}
        }; initializeLiff();
        return () => {};
    }, []);
    
    const handleSubmit = async () => { 
        const firstName = document.getElementById('fname').value.trim();
        const lastName = document.getElementById('lname').value.trim();
        const collage = document.getElementById('collage').value.trim();
        const major = document.getElementById('major').value.trim();
        const studentcode = document.getElementById('studentcode').value.trim();

        const studentCodeRegex = /^(62|63|64|65|66)\d{5}$/;
        const staffCodeRegex = /^PP\d{5}$/; // เพิ่ม staffCodeRegex
    
        if (firstName === '' || lastName === '' || collage === '' || major === '' || studentcode === '' ) { 
            setErrorMessage('โปรดกรอกข้อมูลให้ครบถ้วน');
            return;
        }
        
        let role = '';
        if (studentCodeRegex.test(studentcode)) {
            role = 'user';
        } else if (staffCodeRegex.test(studentcode)) { // แก้เปลี่ยนจาก studentcode เป็น staffcode
            role = 'police';
        } else {
            setErrorMessage('รหัสนักศึกษาหรือรหัสเจ้าหน้าที่ไม่ถูกต้อง');
            return;
        }
    
        const data = {
            userId: profile.userId,
            Fname: firstName,
            Lname: lastName,
            College: collage,
            Major: major,
            Usercode: studentcode,
            Role: role
        };

        const welcome = {
            userId: profile.userId,
            Fname: firstName,
        };

        const richmenu = {
            userId: profile.userId,
        };

        try {
            await useAxios.post('/members/register', data); // API TO DATABASE

            if (role === 'user') {
                await useAxios.post('/line/welcome', welcome); // API TO LINE
                await useAxios.post('/line/richmenuuser', richmenu);
                window.location.href = '/home';

            } else if (role === 'police') {
                await useAxios.post('/line/welcome', welcome);
                await useAxios.post('/line/richmenupolice', richmenu);
                window.location.href = '/staffhome'; 
            }
        } catch (error) { console.error('Error adding member:', error);}
    };
    
    const onLogin = async () => {
        window.location.href = '/login';
      };

    return (
        <div>
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
                <div className="flex items-center">
                    <p className="text-white text-lg md:text-xl font-bold">ลงทะเบียนสมาชิก</p>
                </div>
            </nav>
      
        <div className="p-8" >    
            {profile ? (
                <div className="flex flex-col items-center mt-4">
                    <img className="w-32 h-32 rounded-full mb-2" src={profile.pictureUrl} alt="Line Image"/>
                <div className="text-lg">สวัสดีคุณ {profile.displayName}</div>
                </div>) : ( <div className="mt-4">Loading...</div>
            )}

    <div className="py-4">
        <div className="form-group">
            <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
            id="fname" 
            placeholder="ชื่อ"/>
        </div>
        <div className="py-4">
            <input type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
            id="lname" 
            placeholder="นามสกุล"/>
        </div>
        <div className="form-group">
            <input type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            id="collage" 
            placeholder="คณะ/วิทยาลัย"/>
        </div>
        <div className="py-4">
            <input type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            id="major" 
            placeholder="สาขาวิชา"/>
        </div>
        <div className="form-group">
            <input type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            id="studentcode" 
            placeholder="รหัสนักศึกษา/บุคลากร"/>
        </div>
    </div>
    <div className="mt-4">
        <button className="w-full bg-customBlue text-white p-2 rounded-lg mb-6 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" 
        onClick={handleSubmit}>บันทึกข้อมูล</button>
            <div className="flex justify-center items-center">
                <span>มีข้อมูลที่สมัครอยู่แล้ว? &nbsp;</span>
                <span onClick={onLogin} className='hover:underline text-customBlue font-bold'> เข้าสู่ระบบ</span>
            </div>
    </div>
    {errorMessage && (
        <div className="text-center mt-4 text-red-500">{errorMessage}</div>
    )}
    </div>
    </div>
    );
}

export default Register1;
