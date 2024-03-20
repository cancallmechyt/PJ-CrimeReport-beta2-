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
            <ul>
                {postData.map((item, index) => (
                    <li key={index}>
                        <h2>{item.Title}</h2>
                        <p>{"รายละเอียด : " + item.Detail}</p>
                        <p>{"หมวดหมู่ : " + item.Category}</p>
                        <p>{"สถานที่ : " + item.Locations}</p>
                        <p>{"วัน/เดือน/ปี : " + moment(item.Dates).format('DD/MM/YYYY')}</p> 
                        <p>{"เวลา : " + moment(item.Time, 'HH:mm').format('HH:mm') + " น."}</p>
                        <img src={item.Images} width="100" height="100" />
                    </li>
                ))}
                {profile.map((item, index) => (
                    <li key={index}>
                        <p>ข้อมูลผู้โพส</p>
                        <p>{"ชื่อสกุล : " + item.Fname +" "+ item.Lname}</p>
                        <p>{"คณะ : " + item.College}</p>
                    </li>
                ))}
            </ul>
            {userIdMatch && (
                <Link to={`/posts/edit/${pid}`}>Edit</Link>
            )}
            <br />
            <label id="onBack" onClick={onBack}>Back</label><br />
        </div>
    );
}

export default Post;
