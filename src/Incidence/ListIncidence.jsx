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
      {/* <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
        <div className="flex items-center">
          <p className="text-white text-lg md:text-xl font-bold">รายการของฉัน</p>
        </div>
      </nav> */}
      
      <div className="flex flex-wrap">
        {data.map((val) => (
          <div key={val.pid} className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col border-b border-gray-200`}>
            <Link to={`/posts/${val.pid}`} className="flex items-center">
              <img src={val.Images} className="w-24 h-24 rounded-md mr-4"/>
                <div className="flex flex-col">
                  <h2 className='font-bold'>{val.Title}</h2>
                  <p>{"สถานะ : " + val.PostStatus}</p>
                  <p>{"หมวดหมู่ : " + val.Category}</p>
                  <p>{"สถานที่ : " + val.Locations}</p>
                  <p>{"วัน/เดือน/ปี : " + moment(val.Dates).format('DD/MM/YYYY')}</p> 
                  <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p> 
                </div>
            </Link>
          </div>
        ))}
      </div>
          
      <div className="flex flex-col items-center">
        <button className="mt-4 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300"
          id="onBack" onClick={onBack}>กลับ
        </button>
      </div>  
      
    </div>
  );
}

export default ListIncidence;
