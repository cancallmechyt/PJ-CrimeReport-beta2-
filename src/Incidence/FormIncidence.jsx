import { useState, useEffect, useRef } from 'react';
import liff from '@line/liff';

function Incidence() {
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: '2003845535-ZB3wNLYm' });
        if (liff.isLoggedIn()) {
          const userProfile = await liff.getProfile();
          const item = JSON.parse(localStorage.getItem('LIFF_STORE:2003845535-ZB3wNLYm:context'));
          if (item) {
            const profileDeepCopy = JSON.parse(JSON.stringify(userProfile));
            const ssprofile = Object.assign({}, profileDeepCopy);
            setProfile(ssprofile);
            console.log(item.userId);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    initializeLiff();
  }, []);

  function selectFiles() {
    fileInputRef.current.click();
  }

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
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function handleDragEvents(event) {
    event.preventDefault();
    setIsDragging(event.type === 'dragover');
  }

  function handleDrop(event) {
    handleDragEvents(event);
    const files = event.dataTransfer.files;
    onFileSelect({ target: { files } });
  }

  const onSubmit = async () => {
    console.log("Submit", images );
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
        <label className="category">Category : </label>
        <select id="category">
          <option value="Incidence">Incidence</option>
          <option value="LostItem">LostItem</option>
        </select><br />
        <label className="detail">Detail : </label>
        <input type="text" id="detail" /><br />
        <label className="building">Building : </label>
        <select id="building">
          <option value="Building 1">Building 1</option>
          <option value="Building 2">Building 2</option>
          <option value="Building 3">Building 3</option>
        </select><br />
        <div className='card'>
          <div className='drag-area' onDragOver={handleDragEvents} onDragLeave={handleDragEvents} onDrop={handleDrop}>
            {isDragging ? (
              <span className='select'>Drop img here</span>
              ) : (
              <>
                Drag & Drop img here or{' '}
                <span className='select' role='button' onClick={selectFiles}>
                  Browse
                </span>
              </>
            )}
            <input name='file' type='file' className='file' multiple ref={fileInputRef} onChange={onFileSelect}/>
          </div>
          <div className='container'>
            {images.map((image, index) => (
              <div className='image' key={index}>
                <img src={image.url} width="75" height="75" alt={image.name} />
                <span className='delete' onClick={() => deleteImage(index)}>
                  &times;
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-submit" onClick={onSubmit}>Submit</button><br />
        <label className='label-click' onClick={onBack}>Back</label>
      </div>
    </div>
  );
}

export default Incidence;
