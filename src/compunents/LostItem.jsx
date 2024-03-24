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
        //console.log(response.data);
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

        <div className="flex justify-center mt-2 text-lg font-bold">
          <label className='hover:text-customBlue text-customYellow font-bold' onClick={onLostItem}>ของหาย</label>
            <span className="mx-2">|</span>
          <label className='label-2' onClick={onFindItem}>ตามหาเจ้าของ</label>
        </div>

      <div className="flex flex-wrap">
        {data.map((val, index) => (
          <div key={val.pid} className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col ${index !== 0 ? 'border-t-2 border-gray-200 pt-6' : ''}`}>
            <Link to={`/posts/${val.pid}`} className="flex items-center">
              <img src={val.Images} alt={val.Title} className="w-24 h-24 rounded-md mr-4" />
              <div className="flex flex-col">
                <h2 className='font-bold'>{val.Title}</h2>
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
          id="Register" 
          onClick={onForm}>ลงทะเบียน
        </button>
        <label className="font-light text-gray-400 mb-8" id="onBack" onClick={onBack}>กลับ</label><br />
      </div>
    </div>
  );
}

export default LostItem;
