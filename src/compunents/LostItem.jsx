import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';

function LostItem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get('/post/category/ของหาย');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAPI();
  }, []);

  console.log(data);

  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>LostItem</h1>
      <label className='label-1'>ของหาย </label> 
      <label className='label-2'> ตามหาเจ้าของ</label><br />
      <ul>
        {data.map((val) => (
          <li key={val.Post_id}>
            <p>{"Title : " + val.title}</p>
            <p>{"Detail : " + val.detail}</p>
            <p>{"Location : " + val.location}</p>
            <p>{"Date : " + moment(val.date).format('DD/MM/YYYY')}</p> 
            {/* ใช้ Moment.js เพื่อแปลงรูปแบบของวันที่และเวลา */}
            <p>{"Images : " + val.images}</p>
          </li>
        ))}
      </ul>
      <button id="Register" >ลงทะเบียน</button><br />
      <button id="onBack" onClick={onBack}>กลับ</button><br />
    </div>
  );
}

export default LostItem;
