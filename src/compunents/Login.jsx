import { useEffect, useState } from 'react';
import liff from "@line/liff";
import useAxios from '../useAxios'; 

function Login() {
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [userCode, setUserCode] = useState('');
    const [role, setRole] = useState('');
    const [datas, setDatas] = useState('');

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
        const fetchAPI = async () => {
          try {
            const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
            const response = await useAxios.get(`/members/profile/${item.userId}`);
            setDatas(response.data[0]);
            setRole(response.data[0].Role);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchAPI();
      }, []);

    //console.log(datas);
    
    const handleSubmit = async () => {
        const usercode = document.getElementById('usercode').value.trim();

        if (usercode === '') {
            setErrorMessage('โปรดกรอกข้อมูลให้ครบถ้วน');
            return;
        }

        try {
            if (datas.Usercode === usercode) {
                const welcome = {
                    userId: datas.userId,
                    Fname: datas.Fname,
                };

                const richmenu = {
                    userId: datas.userId,
                };

                if (datas.Role === 'user') {
                    await useAxios.post('/line/welcome', welcome);
                    await useAxios.post('/line/richmenuuser', richmenu);
                    window.location.href = '/home';

                } else if (datas.Role === 'police') {
                    await useAxios.post('/line/welcome', welcome);
                    await useAxios.post('/line/richmenupolice', richmenu);
                    window.location.href = '/staffhome';
                }
            } else {
                setErrorMessage('ไม่มีข้อมูลผู้ใช้ในระบบ');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const onRegister = async () => {
        window.location.href = '/register';
      };
    
    return (
        <div>
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
                <div className="flex items-center">
                    <p className="text-white text-lg md:text-xl font-bold">เข้าสู่ระบบ</p>
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
            <input type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            id="usercode" 
            placeholder="กรอกรหัสนักศึกษา/บุคลากร"/>
        </div>
    </div>
    <div className="mt-1">
        <button className="w-full bg-customBlue text-white p-2 rounded-lg mb-6 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" 
        onClick={handleSubmit}>เข้าสู่ระบบ</button>
            <div className="flex justify-center items-center">
                <span>ยังไม่มีข้อมูลสมาชิก? &nbsp;</span>
                <span onClick={onRegister} className='hover:underline text-customBlue font-bold'> ลงทะเบียน</span>
            </div>
    </div>
    {errorMessage && (
        <div className="text-center mt-4 text-red-500">{errorMessage}</div>
    )}
    </div>
    </div>
    );
}

export default Login;
