import { useState, useEffect } from 'react';
import liff from '@line/liff';

function ListIncidence() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: '2003845535-ZB3wNLYm' });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
          if (item) {
            const profileDeepCopy = JSON.parse(JSON.stringify(userProfile));
            const ssprofile = Object.assign({}, profileDeepCopy);
            setProfile(ssprofile);
            console.log(item.userId);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    initializeLiff();
  }, []);

  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>MyListIncidence</h1>
      <label className="category">Category : </label>
        <select id="category">
          <option value="Incidence">Incidence</option>
          <option value="LostItem">LostItem</option>
        </select><br />
        <button className="btn-submit" onClick={onBack}>Back</button><br />
    </div>
  )
}

export default ListIncidence