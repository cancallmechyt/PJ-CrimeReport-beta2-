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
    const Location = document.getElementById('Location').value;
    const Category = 'แจ้งเหตุ';
    const PostStatus = 'กำลังดำเนินการ';
    const Note = 'หมายเหตุ';
  
    try {
      if (selectedImage) {
        const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);
  
        const response = await useAxios.post('/posts/form/', {
          userId,
          Title,
          Location,
          Category,
          Detail,
          Images: imageUrl, // Get Url from firebase 
          PostStatus,
          Note
        });
  
        console.log('Response:', response.data);
      } 
    } catch (error) { console.error('Error:', error); }
  };
  

  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>
      <h1>ฟอร์มสำหรับแจ้งเหตุ</h1>
      <form>
        <label>หัวข้อ : </label>
        <input type="text" id="Title" /><br />
        <label>รายละเอียด : </label>
        <input type="text" id="Detail" /><br />
        <label>สถานที่ : </label>
        <select id="Location">
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
        </select><br />
        <input type="file" onChange={handleImageChange} /><br />
        <button type="button" onClick={handleSubmit} >Submit</button><br />
        <label type="button" onClick={onBack}>Back</label><br />
      </form>
    </div>
  );
}

export default FormIncidence;
