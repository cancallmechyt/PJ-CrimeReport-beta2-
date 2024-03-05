import { Link } from 'react-router-dom';
import { useEffect} from 'react';
import liff from "@line/liff";

function Home() {
  useEffect(() => {
    liff.init({ liffId: '2003845535-ZB3wNLYm'})
    .then(() => {
        handleLogin()
    });
    return () => {};
  }, []);

  const handleLogin = async () => {
    try {
      // const profile = await liff.getProfile();
      // console.log(profile)
    } catch(err) { console.error(err); }
  };

  return (
    <div>
      <h1>HomePage</h1>
        <div className="Pages">
          <Link to="/lostitem">LostItemPage</Link><br />
          <Link to="/form">FormPage</Link><br />
          <Link to="/list">MyListPage</Link><br />
          <Link to="/about">AboutPage</Link><br />
          <Link to="/guide">GuidePage</Link><br />
          <Link to="/profile">Profile</Link><br />
        </div>
    </div>
  );
}

export default Home;
