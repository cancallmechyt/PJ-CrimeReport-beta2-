import useAxios from '../useAxios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Link } from "react-router-dom";

function Post() {
    const { Post_id } = useParams();
    const [postData, setPostData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [userIdMatch, setUserIdMatch] = useState(false); // เพิ่ม state เพื่อเก็บผลการเปรียบเทียบ userId

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAxios.get(`/post/incident/${Post_id}`);
                setPostData(response.data); //API GET DATA FROM POST (ID)
                const userinfo = await useAxios.get(`/users/profile/${response.data[0].userId}`);
                setProfile(userinfo.data); 
                //console.log(userinfo.data);
                
                const userIdFromApi = response.data[0].userId;
                const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
                const userIdFromLocalStorage = item.userId;
                const users = await useAxios.get(`/users/profile/${item.userId}`);
                
                // ตรวจสอบ userId ที่ได้รับจาก API กับ userId ใน localStorage
                if(users.data[0].Role === 'user'){
                    if(userIdFromApi === userIdFromLocalStorage) {
                        setUserIdMatch(true);
                        //console.log('ok users');
                    }
                } else if (users.data[0].Role === 'police' == 'admin') {
                    setUserIdMatch(true);   
                    //console.log('ok police');                   
                } else {
                    setUserIdMatch(false);
                }
            } catch (error) {
                console.error('Error:');
            }
        }; fetchData();
    }, [Post_id]);

    const onBack = async () => {
        window.history.back();
    };

    return (
        <div>
            <ul>
                {postData.map((item, index) => (
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{"Detail : " + item.detail}</p>
                        <p>{"Category : " + item.category}</p>
                        <p>{"Location : " + item.location}</p>
                        <p>{"Date : " + moment(item.date).format('DD/MM/YYYY')}</p> 
                        <p>{"Images : "}</p>
                        <img src={item.images} width="100" height="100" alt="Post Image" />
                    </li>
                ))}
                {profile.map((item, index) => (
                    <li key={index}>
                        <p>UserInfo</p>
                        <p>{"Name : " + item.Fname + item.Lname}</p>
                        <p>{"Collage : " + item.Collage}</p>
                    </li>
                ))}
            </ul>
            {userIdMatch && (
                <Link to={`/post/incident/edit/${Post_id}`}>Edit</Link>
            )}
            <br />
            <label id="onBack" onClick={onBack}>Back</label><br />
        </div>
    );
}

export default Post;
