import React, { useEffect, useState } from 'react';
import liff from '@line/liff';

function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initLine = async () => {
      try {
        await liff.init({ liffId: "2003845535-ZB3wNLYm" });
        const userProfile = await liff.getProfile();
        setProfile(userProfile);

        // เพิ่มโค้ดเพื่อแสดง IDToken ที่ console.log
        const idToken = liff.getAccessToken();
        console.log(idToken);
      } catch (err) {
        console.log(err);
      }
    };

    initLine();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {profile && (
        <div className='Profile'>
          <img id="lineImg" width="50px" src={profile.pictureUrl} alt="Line Image"/>
          <div id="displayname">{profile.displayName}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
