import { useEffect, useState } from 'react';
import liff from "@line/liff";
import useAxios from '../useAxios'; 

function Register1() {
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Liff function
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
    
    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
        const UID = item.userId;
        
        const checkMember = async (userId) => {
            try {
                const response = await useAxios.get(`/members/profile/${userId}`);
                if (response.data) {
                    window.location.href = '/home';
                }
            } catch (error) { console.error(error); }
        };
        if (UID) {
            checkMember(UID);
    }}, []);
    
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
        
        try {
            // Connect API 
            await useAxios.post('/members/register', data); 
            if (role === 'user') {
                window.location.href = '/home'; // ถ้าเป็น user ให้ไปที่ /home
            } else if (role === 'police') {
                window.location.href = '/staffhome'; // ถ้าเป็น police ให้ไปที่ /StaffHome
            }
        } catch (error) {
            console.error('Error adding member:', error);
            setErrorMessage('มีข้อผิดพลาดในการลงทะเบียน');
        }
        
    };
    
    
    return (
        <div>
            <h1>Register</h1>
                {profile ? (
                    <div className="lineProfile">
                        <img id="lineImg" width="150px" src={profile.pictureUrl} alt="Line Image"/>
                        <div id="displayname">สวัสดีคุณ {profile.displayName}</div>                        
                    </div>
                ) : ( <div>Loading...</div> )}

                    {/* Register */}
                    <div className='register'>
                        {/* FirstName */}
                        <div className="form-group">  
                            <label htmlFor="fname">FirstName: </label>
                            <input type="text" id="fname"/>
                        </div>
                        {/* LastName */}
                        <div className="form-group">  
                            <label htmlFor="lname">LastName: </label>
                            <input type="text" id="lname"/>
                        </div>
                        {/* Collage */}
                        <div className="form-group">  
                            <label htmlFor="collage">Collage: </label>
                            <input type="text" id="collage"/>
                        </div>
                        {/* Major */}
                        <div className="form-group">  
                            <label htmlFor="major">Major: </label>
                            <input type="text" id="major"/>
                        </div>
                        {/* StudentCode */}
                        <div className="form-group">  
                            <label htmlFor="studentcode">UserCode: </label>
                            <input type="text" id="studentcode"/>
                        </div>
                    </div>

                    {/* Display Error Message */}
                    {errorMessage && ( <div className="error-message">{errorMessage}</div> )}
                    <div className='btn=group'>
                        <button id="register" onClick={handleSubmit}>Register</button>
                        {/* หลังสมัครจะบังคับส่งข้อความไปที่ LineOA แล้วจะปิดหน้าต่าง Liff ทิ้ง */}
                    </div>
        </div>
    );
}

export default Register1;
