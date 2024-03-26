import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../useAxios';

function Footer() {
  const [userRoleMatch, setRoleMatch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {         

          const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
          const userIdFromLocalStorage = item.userId;
          //console.log(userIdFromLocalStorage);
          const users = await useAxios.get(`/members/profile/${item.userId}`);
          const checkrole = users.data[0].Role;
          //console.log(checkrole);

          // ตรวจสอบ userId ที่ได้รับจาก API กับ userId ใน localStorage
          if(checkrole === 'police' || checkrole === 'admin'){
              setRoleMatch(true);
          } else {
              setRoleMatch(false);
          }
      } catch (error) {
          console.error('Error:');
      }
  }; fetchData();
}, []);


  return (
    <div className="fixed bottom-0 w-full">
      <nav className="w-full py-3 bg-customBlue shadow flex justify-around">
        <div className="flex items-center "> 
          <Link to="/home">
            <img src="./home.png" alt="Home" className="h-7 w-7" />
          </Link>
        </div>
        <div className="flex items-center"> 
          <Link to="/form">
            <img src="./edit.png" alt="Edit" className="h-7 w-7" />
          </Link>
        </div>
        {/* UserMatch */}
        {userRoleMatch && (
          <div className="flex items-center"> 
              <Link to="/staffhome">
                <img src="./police.png" alt="Edit" className="h-7 w-7" />
              </Link>
          </div>                  
        )}
        <div className="flex items-center"> 
          <Link to="/list">
            <img src="./mine.png" alt="Mine" className="h-7 w-7" />
          </Link>
        </div>
        <div className="flex items-center"> 
          <Link to="/profile">
            <img src="./profile.png" alt="Profile" className="h-7 w-7" />
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Footer