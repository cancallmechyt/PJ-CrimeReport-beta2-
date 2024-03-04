import { useEffect, useState } from 'react';
import liff from "@line/liff";

function About() {
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initializeLIFF = async () => {
      try {
        await liff.init({ liffId: '2003845535-ZB3wNLYm'});
        await handleLogin();
      } catch (error) {
        console.error('LIFF initialization failed:', error);
      }
    };
    
    initializeLIFF();

    return () => {};
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/profile/Uee232a7412d5c7a91ba20067fd159b50`);
      const responseData = await response.text(); 
  
      try {
        const jsonData = JSON.parse(responseData);
        setUserProfile(jsonData);
      } catch (error) {
        console.error('Failed to parse JSON data:', error);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleLogin = async () => {
    try {
      const userProfile = await liff.getProfile();
      setUserId(userProfile.userId);
      console.log(userProfile.userId);
      setUserProfile(userProfile);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {userId && userProfile && (
        <div>
          <img id="lineImg" width="150px" src={userProfile.pictureUrl} alt="Line Image"/>
          <div id="displayname">สวัสดีคุณ {userProfile.displayName}</div>
          <div>Fname: {userProfile.Fname}</div>
          <div>Lname: {userProfile.Lname}</div>
          <div>Collage: {userProfile.Collage}</div>
          <div>Major: {userProfile.Major}</div>
        </div>
      )}
    </div>
  );
}

export default About;
