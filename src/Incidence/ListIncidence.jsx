import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function LostItem() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
        const response = await useAxios.get(`/post/incident/user/${item.userId}`);
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
  //<Link to={user.id}>{user.name}</Link>
  return (
    <div>
      <h1>MyList</h1>
      <ul>
      {data.map((val) => (
      <li key={val.Post_id}>
        <Link to={`/post/incident/${val.Post_id}`}>
          <h2 className='Title'>{val.title}</h2>
        </Link>
        <p>{"Detail : " + val.detail}</p>
        <p>{"Category : " + val.category}</p>
        <p>{"Location : " + val.location}</p>
        <p>{"Date : " + moment(val.date).format('DD/MM/YYYY')}</p> 
        <p>{"Images : "}</p>
        <img src={val.images} width="100" height="100" alt="Post Image" />
      </li>
      ))}
      </ul>
      <button id="onBack" onClick={onBack}>Back</button><br />
    </div>
  );
}

export default LostItem;
