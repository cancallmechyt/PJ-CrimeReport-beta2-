import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function FindItem() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchAPI = async () => {
        try {
          const response = await useAxios.get('/post/category/ตามหาของ');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }; fetchAPI();
}, []);
  
    //console.log(data);
    const onForm = async () => {
      window.location.href = '/formlostitem';
    };
  
    const onBack = async () => {
      window.location.href = '/home';
    };
  
    const onLostItem = async () => {
      window.location.href = '/lostitem';
    };
  
    const onFindItem = async () => {
      window.location.href = '/finditem';
    };
  
    return (
      <div>
        <h1>FindItem</h1>
        <label className='label-1' onClick={onLostItem} >ของหาย </label> 
        <label className='label-2' onClick={onFindItem} > ตามหาเจ้าของ</label><br />
        <ul>
          {data.map((val) => (
            <li key={val.Post_id}>
              <Link to={`/post/incident/${val.Post_id}`}>
                <h2 className='Title'>{val.title}</h2>
              </Link>
              <p>{"Detail : " + val.detail}</p>
              <p>{"Location : " + val.location}</p>
              <p>{"Date : " + moment(val.date).format('DD/MM/YYYY')}</p> 
              <img src={val.images} width="100" height="100" />
            </li>
          ))}
        </ul>
        <button id="Register" onClick={onForm}>ลงทะเบียน</button><br />
        <label id="onBack" onClick={onBack}>กลับ</label><br />
      </div>
    );
  }

export default FindItem