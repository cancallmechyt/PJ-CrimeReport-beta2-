import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import liff from '@line/liff';

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({ liffId: '2003845535-ZB3wNLYm' });
                if (liff.isLoggedIn()) {
                    const userProfile = await liff.getProfile();                                   
                    const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'))    
                    if(item){
                        const userinfo = (await useAxios.get(`/members/profile/${item.userId}`)).data[0];
                        const profiledeepcopy = JSON.parse(JSON.stringify(userProfile))
                        const ssprofile = Object.assign(profiledeepcopy, userinfo)
                        setProfile(ssprofile)
                    }   
                }
            } catch (e) { console.log(e); }
        };  initializeLiff();  
    }, []);

    const logout = async () => {
        const info = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'))
        await useAxios.post('/line/richmenudefault', info).userId;
        liff.logout();
        window.location.href = '/register';
    }

    const onBack = async () => {
        window.history.back();
    };

    return (
        <div>
            {profile ? (
                <div className="flex flex-col items-center mt-4">
                    <img className="mt-4 w-32 h-32 rounded-full mb-2" id="lineImg" width="150px" src={profile.pictureUrl} alt="Line Image"/>
                    <div className="text-lg" id="displayname">สวัสดีคุณ {profile.displayName}</div> 
                    <div className="mt-4 text-lg" >{profile.Fname} {profile.Lname}</div>  
                    <div className="text-lg" >คณะ/วิทยาลัย : {profile.College}</div>
                    <div className="text-lg" >สาขาวิชา : {profile.Major}</div>   
                </div>
            ) : (
                <div role="status" className="flex justify-center items-center">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            )}
            <div className="flex flex-col items-center">
                <button className="mt-4 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"  
                    d="logout" 
                    onClick={logout}>
                    ออกจากระบบ
                </button>
                <label className="font-light text-gray-400 mb-8" onClick={onBack}>กลับ</label>
            </div>
        </div>
    );
}

export default Profile;
