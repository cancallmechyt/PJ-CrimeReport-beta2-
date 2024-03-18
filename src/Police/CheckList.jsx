import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function CheckList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get('/post/category/แจ้งเหตุ');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }; fetchAPI();
  }, []);

  console.log(data);

  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>
      <h1>CheckList</h1>
      <ul>
        {data.map((val) => (
          <li key={val.Post_id}>
            <Link to={`/post/incident/${val.Post_id}`}>
              <h2 className='Title'>{val.title}</h2>
            </Link>
            <p>{"Detail : " + val.detail}</p>
            <p>{"Location : " + val.location}</p>
            <p>{"Date : " + moment(val.date).format('DD/MM/YYYY')}</p> 
            {/* ใช้ Moment.js เพื่อแปลงรูปแบบของวันที่และเวลา */}
            <img src={val.images} width="100" height="100" />
          </li>
        ))}
      </ul>
      <button id="onBack" onClick={onBack}>กลับ</button><br />
    </div>
  );
}

export default CheckList