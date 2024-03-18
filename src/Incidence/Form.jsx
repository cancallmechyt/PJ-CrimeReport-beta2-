import { useState, useRef } from 'react';

function Incidence() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  function onFileSelect(event) {
    const files = event.target.files;
    if (!files.length) return;
    for (const file of files) {
      if (file.type.split('/')[0] !== 'image') continue;
      if (!images.some((image) => image.name === file.name)) {
        setImages((prevImages) => [
          ...prevImages,
          { name: file.name, url: URL.createObjectURL(file) },
        ]);
      }}
    }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  const onSubmit = async () => {
    console.log("Data:", images.map(image => image.url)); // Log the images URLs
  };

  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>Incidence Form</h1>
      <div className='Form-'>
        <br />
        <label className="title">Title: </label>
        <input type="text" id="title" /><br />
        <label className="detail">Detail : </label>
        <input type="text" id="detail"/><br />
        <label className="building">Building : </label>
        <select id="building">
          <option value="Building 1">Building 1</option>
          <option value="Building 2">Building 2</option>
          <option value="Building 3">Building 3</option>
        </select><br />
        <div className='card'>
          <input name='file' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect}/>
            {images.map((image, index) => (
              <div className='image' key={index}>
              <img src={image.url} width="75" height="75" alt={image.name} />
                <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
              </div>
            ))}
        </div>
        <button className="btn-submit" onClick={onSubmit}>Submit</button><br />
        <label className='label-click' onClick={onBack}>Back</label>
      </div>
    </div>
  );
}

export default Incidence;
