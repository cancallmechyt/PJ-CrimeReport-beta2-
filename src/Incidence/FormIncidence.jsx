import { useState } from 'react';
import useAxios from '../useAxios';
// FireBase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../firebase';

function FormIncidence() {
  const [selectedImage, setSelectedImage] = useState(null);

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
    const Category = 'แจ้งเหตุ';
    const PostStatus = 'กำลังดำเนินการ';
    const Note = 'หมายเหตุ';
  
    try {
      if (selectedImage) {
        const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);
  
        const response = await useAxios.post('/posts/form', {
          userId,
          Title,
          Locations,
          Category,
          Detail,
          Images: imageUrl, // Get Url from firebase 
          PostStatus,
          Note
        });
        
        alert('สร้างฟอร์มสำเร็จ')
        window.location.href = '/home'
        console.log('Response:', response.data);
      } 
    } catch (error) { console.error('Error:', error); }
  };
  
  const onForm = async () => {
    window.location.href = '/form';
  };

  const onFormLostItem = async () => {
    window.location.href = '/formlostitem';
  };

  return (
  <div>
    
    <div className="flex justify-center mt-2 text-lg font-bold">
        <label className='hover:text-customBlue text-customYellow font-bold' onClick={onForm}>แจ้งเหตุ</label>
          <span className="mx-2">|</span>
        <label className='label-2'onClick={onFormLostItem}>แจ้งของหาย</label>
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
          <textarea 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            id="Detail"
            placeholder="รายละเอียด"
          />
        </div>
        <div className="form-group">
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
        <div className="py-4">
          <input type="file" id="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleImageChange} />
        </div>
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-32 h-32 rounded-md mb-2 mx-auto" />
          )}
        <div className="flex flex-col items-center">
          <button className="mt-4 w-full bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={handleSubmit}>แจ้งเรื่อง</button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default FormIncidence;
