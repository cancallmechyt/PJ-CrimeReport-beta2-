import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function ListIncidence() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
        const response = await useAxios.get(`/posts/user/${item.userId}`);

        // แปลงเวลาให้อยู่ในรูปแบบของ Date object
        const posts = response.data.map(post => {
          const dateObject = new Date(post.Date.seconds * 1000 + post.Date.nanoseconds / 1000000);
          const formattedDate = moment(dateObject).format('MMM DD, YYYY');

          return {
            ...post,
            Date: formattedDate,
            StatusColor: setStatusColor(post.PostStatus),
          };
        });
        
        setData(posts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const setStatusColor = (status) => {
      if (status === 'กำลังดำเนินการ') {
        return 'text-yellow-500';
      } else if (status === 'เสร็จสิ้น') {
        return 'text-green-500';
      } else {
        return 'text-gray-500';
      }
    };

    fetchAPI();
  }, []);
  
  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div className="p-4" > 
    
      <form className="max-w-md mx-auto">   
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="default-search" placeholder="หมวดหมู่ / สถานะ / อื่นๆ " onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-customBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-customBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

      <div className="flex flex-wrap">
      {data.filter(val => 
          val.Title.toLowerCase().includes(query.toLowerCase()) || 
          val.Locations.toLowerCase().includes(query.toLowerCase()) ||
          val.Category.toLowerCase().includes(query.toLowerCase()) ||
          val.PostStatus.toLowerCase().includes(query.toLowerCase()) ||
          val.Date.toLowerCase().includes(query.toLowerCase()) ||
          moment(val.Time, 'HH:mm').format('HH:mm').includes(query.toLowerCase()) 
          ).sort((a, b) => new Date(b.Date) - new Date(a.Date)).map((val) => (
          <div key={val.pid} className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col border-b border-gray-200 relative`}>
            <Link to={`/posts/${val.pid}`} className="flex items-center">
              <img src={val.Images} className="w-24 h-24 rounded-md mr-4"/>
              <div className="flex flex-col w-full">
                <h2 className='font-bold'>{val.Title}</h2>
                <p>{"หมวดหมู่ : " + val.Category}</p>
                <p>{"สถานที่ : " + val.Locations}</p>
                <p>{"วันที่ : " + val.Date}</p> 
                <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p> 
                <p className={`absolute top-1 right-2 text-sm font-semibold ${val.StatusColor}`}>{val.PostStatus}</p>
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
