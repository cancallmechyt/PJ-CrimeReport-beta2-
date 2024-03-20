import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function ListIncidence() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
        const response = await useAxios.get(`/posts/user/${item.userId}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };  fetchAPI();
  }, []); 

  console.log(data);

  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>MyList</h1>
      <ul>
        {data.map((val) => (
          <li key={val.pid}>
            <Link to={`/posts/${val.pid}`}>
              <h2 className='Title'>{val.Title}</h2>
            </Link>
              <p>{"สถานะ : " + val.PostStatus}</p>
              <p>{"รายละเอียด : " + val.Detail}</p>
              <p>{"หมวดหมู่ : " + val.Category}</p>
              <p>{"สถานที่ : " + val.Location}</p>
              <p>{"วัน/เดือน/ปี : " + moment(val.Date).format('DD/MM/YYYY')}</p> 
              <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p> 
              <img src={val.Images} width="150" height="150" alt="Post Image" />
              <p>{"หมายเหตุ : " + val.Note}</p>
          </li>
        ))}
      </ul>
      <label id="onBack" onClick={onBack}>กลับ</label><br />
    </div>
  );
}

export default ListIncidence;
