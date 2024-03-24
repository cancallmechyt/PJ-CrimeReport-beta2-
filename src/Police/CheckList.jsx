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
      
      <div className="flex flex-wrap">
        {data.map((val, index) => (
          <div key={val.pid} className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col ${index !== 0 ? 'border-t border-gray-300' : ''}`}>
            <Link to={`/posts/editstaff/${val.pid}`} className="flex items-center">
              <img src={val.Images} className="w-24 h-24 rounded-md mr-4" />
              <div className="flex flex-col ml-4"> 
                <h2 className='font-bold'>{val.Title}</h2>
                <p>{"สถานะ : " + val.PostStatus}</p>
                <p>{"สถานที่ : " + val.Locations}</p>
                <p>{"วัน/เดือน/ปี : " + moment(val.Dates).format('DD/MM/YYYY')}</p> 
                <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p>
            </div> 
            </Link>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <button id="onBack" onClick={onBack} className="mt-4 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300">
          กลับ
        </button>
      </div>  
        
    </div>
  );
}

export default CheckList