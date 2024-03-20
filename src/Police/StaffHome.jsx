import { Link } from 'react-router-dom';
import { useEffect, useState} from 'react';
import liff from "@line/liff";

function StaffHome() {
  const [profile, setProfile] = useState(null);

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
      } catch (e) {
        console.error(e);
      }
    };
    initializeLiff();
    return () => {};
  }, []);

  return (
    <div>
      {profile && (
          <div>
            <p>ยินดีต้อนรับ คุณ {profile.displayName}</p>
            <img src={profile.pictureUrl} width="50" height="50" alt="Profile" />
          </div>
        )}
      <h1>StaffHome</h1>
        <div className="Pages">
          <Link to="/lostitem">LostItemPage</Link><br />
          <Link to="/form">FormPage</Link><br />
          <Link to="/checklist">CheckList</Link><br />
          <Link to="/about">AboutPage</Link><br />
          <Link to="/guide">GuidePage</Link><br />
          <Link to="/profile">Profile</Link><br />
          <Link to="/home">Home</Link><br />
        </div>
    </div>
  );
}

export default StaffHome