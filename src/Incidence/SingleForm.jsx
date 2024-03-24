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
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAxios.get(`/posts/${pid}`);
                setPostData(response.data); //API GET DATA FROM POST (ID)
                const userinfo = await useAxios.get(`/members/profile/${response.data[0].userId}`);
                setProfile(userinfo.data); 
                //console.log(userinfo.data);
                
                const userIdFromApi = response.data[0].userId;
                //console.log(userIdFromApi);
                const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
                const userIdFromLocalStorage = item.userId;
                //console.log(userIdFromLocalStorage);
                const users = await useAxios.get(`/members/profile/${item.userId}`);
                const checkrole = users.data[0].Role;

                // ตรวจสอบ userId ที่ได้รับจาก API กับ userId ใน localStorage
                if(checkrole === 'user'){
                    if(userIdFromApi === userIdFromLocalStorage) {
                        setUserIdMatch(true);
                        console.log('ok users');
                    }
                } else if (checkrole === 'police' || checkrole === 'admin') { // แก้ไขตรวจสอบ role ให้เป็นเงื่อนไขเดียว
                    setUserIdMatch(true);   
                    console.log('ok police and admin');                   
                } else {
                    setUserIdMatch(false);
                }
            } catch (error) {
                console.error('Error:');
            }
        }; fetchData();
    }, [pid]);

    const onBack = async () => {
        window.history.back();
    };

    return (
        <div>
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between">
                <div className="flex items-center">
                    <img src="./logo.png " className="h-7 w-7 ml-2 mr-3" />
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
                        {moment(item.Dates).format('D MMMM YYYY')}
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
                {userIdMatch && (
                    <Link className="mt-4 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" 
                    to={`/posts/edit/${pid}`}>แก้ไข</Link>)}
                <label className="font-light text-gray-400 mb-8" id="onBack" onClick={onBack}>กลับ</label>
            </div>
        </div>
    );
}

export default Post;
