import { useState, useEffect } from 'react';
import useAxios from '../useAxios';
import moment from 'moment';
import { Link } from "react-router-dom";

function FindItem() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
      const fetchAPI = async () => {
        try {
          const response = await useAxios.get('/posts/category/ตามหาของ');
          //setData(response.data);

          const posts = response.data.map(post => {
            const dateObject = new Date(post.Date.seconds * 1000 + post.Date.nanoseconds / 1000000);
            const formattedDate = moment(dateObject).format('MMM DD, YYYY');
  
            return {
              ...post,
              Date: formattedDate,
            };
          });
          
          setData(posts);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }; fetchAPI();
}, []);
    
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
      <div className="p-4">
          <form className="max-w-md mx-auto">   
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input type="text" id="default-search" placeholder="สถานที่ / วัน และ เวลา / อื่นๆ  " onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-customBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-customBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
          </form>

          <div className="flex justify-center mt-2 text-lg font-bold">
            <label className='label-1' onClick={onLostItem}>ของหาย</label>
              <span className="mx-2">|</span>
            <label className='hover:text-customBlue text-customYellow font-bold' onClick={onFindItem}>ตามหาเจ้าของ</label>
          </div>

        <div className="flex flex-wrap">
          {data.filter(val => 
            val.Title.toLowerCase().includes(query.toLowerCase()) || 
            val.Locations.toLowerCase().includes(query.toLowerCase()) ||
            val.Category.toLowerCase().includes(query.toLowerCase()) ||
            val.PostStatus.toLowerCase().includes(query.toLowerCase()) ||
            val.Date.toLowerCase().includes(query.toLowerCase()) ||
            moment(val.Time, 'HH:mm').format('HH:mm').includes(query.toLowerCase()) 
            ).sort((a, b) => new Date(b.Date) - new Date(a.Date)).map((val, index) => (
            <div key={val.pid} className={`w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col ${index !== 0 ? 'border-t-2 border-gray-200 pt-6' : ''}`}>
              <Link to={`/posts/${val.pid}`} className="flex items-center">
                <img src={val.Images} alt={val.Title} className="w-24 h-24 rounded-md mr-4" />
                <div className="flex flex-col">
                  <h2 className='font-bold'>{val.Title}</h2>
                  <p>{"สถานที่ : " + val.Locations}</p>
                  <p>{"วันที่ : " + val.Date}</p> 
                  <p>{"เวลา : " + moment(val.Time, 'HH:mm').format('HH:mm') + " น."}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <label className="font-light text-gray-400 mb-8" id="onBack" onClick={onBack}>กลับ</label><br />
        </div>
      </div>
    );
  }

export default FindItem