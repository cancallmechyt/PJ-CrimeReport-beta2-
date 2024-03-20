import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function CheckList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get('/posts/category/แจ้งเหตุ');
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
          <li key={val.pid}>
            <Link to={`/posts/editstaff/${val.pid}`}>
              <h2 className='Title'>{val.Title}</h2>
            </Link>
            <p>{"สถานะ : " + val.PostStatus}</p>
            <p>{"รายละเอียด : " + val.Detail}</p>
            <p>{"สถานที่ : " + val.Location}</p>
            <p>{"วัน/เดือน/ปี : " + moment(val.Date).format('DD/MM/YYYY')}</p> 
            <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p>
            <img src={val.Images} width="100" height="100" />
          </li>
        ))}
      </ul>
      <button id="onBack" onClick={onBack}>กลับ</button><br />
    </div>
  );
}

export default CheckList