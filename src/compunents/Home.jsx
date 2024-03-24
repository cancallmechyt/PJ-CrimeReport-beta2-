import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import liff from "@line/liff";
import useAxios from '../useAxios';
import moment from 'moment';

function Home() {
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: '2003845535-ZB3wNLYm' });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
        }
      } catch (e) {
        console.error(e);
      }
    };
    initializeLiff();
    return () => {};
  }, []);

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

  return (
    <div>
      <img className="mt-2" src='./event.png'/>     

      {/* Search */}
      <div className="p-4" >
        <form className="max-w-md mx-auto">   
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="default-search" placeholder="หัวข้อ / สถานที่ / เวลา " onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-customBlue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-customBlue dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
        
        {/* Box */}
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center"> 
              <Link to="/lostitem">
                <img src="./01.png" alt="Logo" className="h-10 w-10 mx-auto" />
                  รายการของหาย
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center"> 
              <Link to="/form">
                <img src="./04.png" alt="Logo" className="h-10 w-10 mx-auto" />
                  ฟอร์มแจ้งเหตุ
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center"> 
              <Link to="/about">
                <img src="./03.png" alt="Logo" className="h-10 w-10 mx-auto" />
                  เกี่ยวกับเรา
              </Link>
            </div>
            <div className="p-4 rounded-lg text-xs bg-customBlue hover:bg-customYellow text-white text-center flex items-center justify-center">
              <Link to="/guide">
                <img src="./02.png" alt="Logo" className="h-10 w-10 mx-auto" />
                  แนะนำระบบ
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className='flex items-center justify-center font-bold'>
            รายการของหายล่าสุด
          </div>
          {data.filter(val => 
          val.Title.toLowerCase().includes(query.toLowerCase()) || 
          val.Locations.toLowerCase().includes(query.toLowerCase()) ||
          moment(val.Dates).format('DD/MM/YYYY').includes(query.toLowerCase()) ||
          moment(val.Time, 'HH:mm').format('HH:mm').includes(query.toLowerCase()) 
          ).map((val, index) => (
            <div key={val.pid} className={`bg-customSilver mt-2 w-full md:w-2/3 xl:w-2/4 p-6 flex flex-col ${index !== 0 ? 'border-t-2 border-gray-200 pt-6' : ''} border rounded-md`}>
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

        </div>
    </div>
  );
}

export default Home;
