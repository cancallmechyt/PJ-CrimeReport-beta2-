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
                        const userinfo = (await useAxios.get(`/profile/${item.userId}`)).data[0];
                        const profiledeepcopy = JSON.parse(JSON.stringify(userProfile))
                        const ssprofile = Object.assign(profiledeepcopy, userinfo)
                        setProfile(ssprofile)
                    }   
                }
            } catch (e) { console.log(e); }
        };  initializeLiff();  
    }, []);

    const logout = async () => {
        liff.logout();
        window.location.href = '/register';
    }

    return (
        <div>
            <h1>Profile</h1>
            {profile ? (
                <div className="lineProfile">
                    <img id="lineImg" width="150px" src={profile.pictureUrl} alt="Line Image"/>
                    <div id="displayname">สวัสดีคุณ {profile.displayName}</div> 
                    <div>Fname: {profile.Fname}</div>
                    <div>LName: {profile.Lname}</div>       
                    <div>Collage: {profile.Collage}</div>
                    <div>Major: {profile.Major}</div>   
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <button id="logout" onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;
