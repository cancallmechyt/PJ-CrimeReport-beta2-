import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function LostItem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await useAxios.get('/posts/category/ของหาย');
        setData(response.data);
        console.log(response.data);
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
      <h1>LostItem</h1>
      <label className='label-1' onClick={onLostItem} >ของหาย </label> 
      <label className='label-2' onClick={onFindItem} > ตามหาเจ้าของ</label><br />
      <ul>
        {data.map((val) => (
          <li key={val.pid}>
            <Link to={`/posts/${val.pid}`}>
              <h2 className='Title'>{val.Title}</h2>
            </Link>
            <p>{"รายละเอียด : " + val.Detail}</p>
            <p>{"สถานที่ : " + val.Locations}</p>
            <p>{"วัน/เดือน/ปี : " + moment(val.Dates).format('DD/MM/YYYY')}</p> 
            <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p>
            <img src={val.Images} width="100" height="100" />
          </li>
        ))}
      </ul>
      <button id="Register" onClick={onForm}>ลงทะเบียน</button><br />
      <label id="onBack" onClick={onBack}>กลับ</label><br />
    </div>
  );
}

export default LostItem;
