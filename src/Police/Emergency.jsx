import { useState } from 'react';
import useAxios from '../useAxios';

// FireBase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../firebase';

function Emergency() {
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
    const Category = document.getElementById('Category').value;
    const PostStatus = 'ของหาย';
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
          Images: imageUrl, // Get Url from firebase 
          Locations,
          Category,
          PostStatus,
          Note
        });

        const sendmessage = await useAxios.post('/line/flex',{
          Category,
          Title,
          Detail,
          Images: imageUrl, // Get Url from firebase 
          Locations,
        });

        alert('สร้างฟอร์มสำเร็จ')
        window.history.back();
        console.log('Response:', response.data, sendmessage.data );
      } else {
        console.error('Please select an image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>
      
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
              <option value="เหตุฉุกเฉิน">เหตุฉุกเฉิน</option>
              <option value="กิจกรรม">กิจกรรม</option>
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
            <input type="file" id="file" className="w-full p-2 border border-gray-300 rounded-md mt-1" onChange={handleImageChange} />
          </div>
          <div className="py-4">
            {selectedImage && ( <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-32 h-32 rounded-md mb-2 mx-auto" />)}
          </div>
          <div className="form-group">
            <div className="flex flex-col items-center">
              <button className="mt-4 w-full bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={handleSubmit}>แจ้งเหตุฉุกเฉิน</button>
              <label className="font-light text-gray-400 mb-8" type="button" onClick={onBack}>กลับ</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Emergency;

