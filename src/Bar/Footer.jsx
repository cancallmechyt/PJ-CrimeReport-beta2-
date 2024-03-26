import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../useAxios';

function Footer() {
  const [userRoleMatch, setRoleMatch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {         

          const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
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
          <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fhome.png?alt=media&token=e9d3ab3c-248b-48f2-9c19-7f68c01af147"} alt="Home" className="h-7 w-7" />
            {/* <img src="./home.png" alt="Home" className="h-7 w-7" /> */}
          </Link>
        </div>
        <div className="flex items-center"> 
          <Link to="/form">
            <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fedit.png?alt=media&token=2daa0539-cec5-4519-a554-c2416380473d"} alt="Edit" className="h-7 w-7" />
            {/* <img src="./edit.png" alt="Edit" className="h-7 w-7" /> */}
          </Link>
        </div>
        {/* UserMatch */}
        {userRoleMatch && (
          <div className="flex items-center"> 
              <Link to="/staffhome">
                <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fpolice.png?alt=media&token=546b38b4-b06d-42ac-8497-bc37ffeed2ba"} alt="Edit" className="h-7 w-7" />
                {/* <img src="./police.png" alt="Edit" className="h-7 w-7" /> */}
              </Link>
          </div>                  
        )}
        <div className="flex items-center"> 
          <Link to="/list">
            <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fmine.png?alt=media&token=67ba893f-9aac-44c2-adaa-c7044947399e"} alt="Mine" className="h-7 w-7" /> 
            {/* <img src="./mine.png" alt="Mine" className="h-7 w-7" /> */}
          </Link>
        </div>
        <div className="flex items-center"> 
          <Link to="/profile">
            <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fprofile.png?alt=media&token=b459073e-d0d7-40dc-9430-e211e671ee79"} alt="Profile" className="h-7 w-7" />
            {/* <img src="./profile.png" alt="Profile" className="h-7 w-7" /> */}
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Footer