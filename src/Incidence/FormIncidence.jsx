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
    const title = document.getElementById('Title').value;
    const location = document.getElementById('Location').value;
    const category = 'incident';

    try {
      if (selectedImage) {
        const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
        await uploadBytes(imageRef, selectedImage);
        const imageUrl = await getDownloadURL(imageRef);

        const response = await useAxios.post('/post/incident/test/', {
          userId,
          title,
          images: imageUrl, // Get Url from firebase 
          location,
          category,
        });

        console.log('Response:', response.data);
      } else {
        console.error('Please select an image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>FormIncidence</h1>
      <form>
        <input type="text" id="Title" /><br />
        <select id="Location">
          <option value="Building A">Building A</option>
          <option value="Building B">Building B</option>
        </select><br />
        <input type="file" onChange={handleImageChange} /><br />
        <button type="button" onClick={handleSubmit} >Submit</button><br />
        <button type="button" onClick={onBack}>Back</button><br />
      </form>
    </div>
  );
}

export default FormIncidence;
