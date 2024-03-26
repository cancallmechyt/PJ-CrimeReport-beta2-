import { useState, useEffect } from 'react';
import useAxios from '../useAxios';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../firebase';

function FormLostItem() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userRoleMatch, setRoleMatch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {         

          const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
          const users = await useAxios.get(`/members/profile/${item.userId}`);
          const checkrole = users.data[0].Role;
  
          if(checkrole === 'police' || checkrole === 'admin'){
              setRoleMatch(true);
              console.log("ok");
          } else {
              setRoleMatch(false);
          }
      } catch (error) {
          console.error('Error:');
      }
    }; fetchData();
  }, []);  

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context')); 
    const userId = item.userId; 
    const Title = document.getElementById('Title').value;
    const Detail = document.getElementById('Detail').value;
    const Locations = document.getElementById('Location').value;
    const Category = document.getElementById('Category').value;
    const PostStatus = document.getElementById('PostStatus').value;
    const Note = 'หมายเหตุ';

    try {
      if (selectedImage) {
        const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);

        const response = await useAxios.post('/posts/form/', {
          userId,
          Title,
          Detail,
          Images: imageUrl, 
          Locations,
          Category,
          PostStatus,
          Note
        });

        alert('สร้างฟอร์มสำเร็จ')
        window.history.back();
        console.log('Response:', response.data);
      } else {
        console.error('Please select an image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onForm = async () => {
    window.location.href = '/form';
  };

  const onFormLostItem = async () => {
    window.location.href = '/formlostitem';
  };

  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>

      <div className="flex justify-center mt-2 text-lg font-bold">
          <label className='label-2' onClick={onForm}>แจ้งเหตุ</label>
            <span className="mx-2">|</span>
          <label className='hover:text-customBlue text-customYellow font-bold'onClick={onFormLostItem}>แจ้งของหาย</label>
      </div>

      <div className="p-8">
        <form className="py-4">
          <div className="form-group">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="Title"
              placeholder="หัวข้อ"
            />
          </div>
          <div className="py-4">
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              id="Detail"
              placeholder="รายละเอียด"
            />
          </div>
          <div className="form-group">
            <select id="Category" className="w-full p-2 border border-gray-300 rounded-md mt-1">
              <option value="ของหาย">ของหาย</option>
                {userRoleMatch && (
                  <option value="ตามหาของ">ตามหาของ</option>
                )}
            </select>
          </div>
          <div className="mt-4 form-group">
            <select id="PostStatus" className="w-full p-2 border border-gray-300 rounded-md mt-1">
              <option value="กำลังตามหา">กำลังตามหา</option>
              <option value="เรียบร้อย">เสร็จสิ้น</option>
            </select>
          </div>
          <div className="py-4">
            <select id="Location" className="w-full p-2 border border-gray-300 rounded-md mt-1">
              <option value="ตึก 1">ตึก 1</option>
              <option value="ตึก 2">ตึก 2</option>
              <option value="ตึก 3">ตึก 3</option>
              <option value="ตึก 4">ตึก 4</option>
              <option value="ตึก 5">ตึก 5</option>
              <option value="ตึก 6">ตึก 6</option>
              <option value="ตึก 7">ตึก 7</option>
              <option value="ตึก 8">ตึก 8</option>
              <option value="ตึก 9">ตึก 9</option>
              <option value="ตึก 10">ตึก 10</option>
              <option value="ตึก 11">ตึก 11</option>
              <option value="ตึก 12">ตึก 12</option>
              <option value="ตึก 13">ตึก 13</option>
              <option value="ตึก 14">ตึก 14</option>
              <option value="ตึก 15">ตึก 15</option>
            </select>
          </div>
          <div className="form-group">
            <input type="file" id="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleImageChange} />
          </div>
          <div className="py-4">
            {selectedImage && ( <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-32 h-32 rounded-md mb-2 mx-auto" />)}
          </div>
          <div className="form-group">
            <div className="flex flex-col items-center">
              <button className="mt-4 w-full bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={handleSubmit}>ลงทะเบียน</button>
              <label className="font-light text-gray-400 mb-8" type="button" onClick={onBack}>กลับ</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormLostItem;

