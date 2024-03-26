import useAxios from '../useAxios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from "react-router-dom";

function Post() {
    const { pid } = useParams();
    const [postData, setPostData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [userIdMatch, setUserIdMatch] = useState(false); // เพิ่ม state เพื่อเก็บผลการเปรียบเทียบ userId
    const [userRoleMatch, setRoleMatch] = useState(false);
    const [PoliceMatch, setPoliceMatch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAxios.get(`/posts/${pid}`);
                //setPostData(response.data); //API GET DATA FROM POST (ID)

                const posts = response.data.map(post => {
                    const dateObject = new Date(post.Date.seconds * 1000 + post.Date.nanoseconds / 1000000);
                    const formattedDate = moment(dateObject).format('MMM DD, YYYY');
          
                    return {
                      ...post,
                      Date: formattedDate,
                    };
                  });
                  
                  setPostData(posts);    

                const userinfo = await useAxios.get(`/members/profile/${response.data[0].userId}`);
                setProfile(userinfo.data); 
                //console.log(userinfo.data);
                
                const userIdFromApi = response.data[0].userId;
                const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
                const userIdFromLocalStorage = item.userId;
                const users = await useAxios.get(`/members/profile/${item.userId}`);
                const checkrole = users.data[0].Role;

                // ตรวจสอบ userId ที่ได้รับจาก API กับ userId ใน localStorage
                if(checkrole === 'user'){
                    if(userIdFromApi === userIdFromLocalStorage) {
                        setUserIdMatch(true); 
                    }
                        } else if (checkrole === 'police' || checkrole === 'admin') { // แก้ไขตรวจสอบ role ให้เป็นเงื่อนไขเดียว
                            setUserIdMatch(true);                     
                        } else {
                            setUserIdMatch(false);
                        }
            } catch (error) {
                console.error('Error:');
            }
        }; fetchData();
    }, [pid]);

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
                  setPoliceMatch(true);
              } else {
                  setRoleMatch(false);
              }
          } catch (error) {
              console.error('Error:');
          }
      }; fetchData();
    }, []);

    const onBack = async () => {
        window.history.back();
    };

    return (
        <div>
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between">
                <div className="flex items-center">
                    <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Flogo.png?alt=media&token=91918240-ef82-482c-8122-00e3428d28ae"} className="h-7 w-7 ml-2 mr-3" />
                    <p className="text-white text-lg md:text-xl font-bold">รายการ</p>
                </div>
                <div className="flex items-center justify-center flex-1">
                </div>
            </nav>

            <ul>
                {postData.map((item, index) => (
                    <li key={index} className="text-center"><br />                                                                                                                              
                        <p className="text-xl text-customYellow font-bold">{item.Category}</p>
                        <h2 className="flex flex-col items-center mt-4 text-lg font-bold">{item.Title}</h2>
                        <p>
                        {item.Date}
                        {" • " + moment(item.Time, 'HH:mm').format('HH:mm') + " น."}
                        </p>
                        <img src={item.Images} width="300" height="300" className="rounded-md mb-2 mx-auto" />
                        <p className="ml-12 text-left font-bold" >รายละเอียด</p>
                        <p className="ml-12 text-left" >{" • " + item.Detail}</p>
                        <p className="ml-12 text-left font-bold" >สถานที่</p>
                        <p className="ml-12 text-left" >{" • " + item.Locations}</p><br/>
                    </li>
                ))}
            </ul>


            <ul>
                {profile.map((item, index) => (
                    <li key={index}>
                        <p className="ml-12 text-left font-bold" >ข้อมูลผู้โพส</p>
                        <p className="ml-12 text-left" >{"ชื่อสกุล : " + item.Fname +" "+ item.Lname}</p>
                        <p className="ml-12 text-left" >{"คณะ : " + item.College}</p>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col items-center">
                {/* {PoliceMatch && (
                    <Link className="mt-4 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
                    to={`/posts/editstaff/${pid}`}>รับเรื่องแจ้งเหตุ</Link>
                )} */}
                {userIdMatch && (
                    <Link className="mt-2 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" 
                    to={`/posts/edit/${pid}`}>แก้ไข</Link>)}
                
                <label className="font-light text-gray-400 mb-8" id="onBack" onClick={onBack}>กลับ</label>
            </div>
            

            <div className="fixed bottom-0 w-full">
                <nav className="w-full py-3 bg-customBlue shadow flex justify-around">
                    <div className="flex items-center "> 
                    <Link to="/home">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fhome.png?alt=media&token=e9d3ab3c-248b-48f2-9c19-7f68c01af147"} alt="Home" className="h-7 w-7" />
                    </Link>
                    </div>
                    <div className="flex items-center"> 
                    <Link to="/form">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fedit.png?alt=media&token=2daa0539-cec5-4519-a554-c2416380473d"} alt="Edit" className="h-7 w-7" />
                    </Link>
                    </div>
                    {/* UserMatch */}
                    {userRoleMatch && (
                    <div className="flex items-center"> 
                        <Link to="/staffhome">
                            <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fpolice.png?alt=media&token=546b38b4-b06d-42ac-8497-bc37ffeed2ba"} alt="Edit" className="h-7 w-7" />
                        </Link>
                    </div>                  
                    )}
                    <div className="flex items-center"> 
                    <Link to="/list">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fmine.png?alt=media&token=67ba893f-9aac-44c2-adaa-c7044947399e"} alt="Mine" className="h-7 w-7" />
                    </Link>
                    </div>
                    <div className="flex items-center"> 
                    <Link to="/profile">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fprofile.png?alt=media&token=b459073e-d0d7-40dc-9430-e211e671ee79"} alt="Profile" className="h-7 w-7" />
                    </Link>
                    </div>
                </nav>
            </div>      
        </div>
    );
}

export default Post;
