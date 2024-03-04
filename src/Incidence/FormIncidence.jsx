import { useState, useEffect } from 'react';
import liff from '@line/liff';

function Incidence() {
    const [files, setFiles] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [location, setLocation] = useState('');
    const [setProfile] = useState(null);

    useEffect(() => {
        const initializeLiff = async () => {
            try {
                await liff.init({ liffId: '2003845535-ZB3wNLYm' });
                if (liff.isLoggedIn()) {
                    const userProfile = await liff.getProfile();
                    setProfile(userProfile);
                }
            } catch (e) {console.log("")}
        };  initializeLiff();  
        return () => { };
    }, []);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files, ...selectedFiles.slice(0, 5 - files.length)];
        setFiles(newFiles);

        const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(newPreviewUrls);
    }

    const handleSubmit = () => {
        // ทำการส่งข้อมูลทั้งหมดไปยังเซิร์ฟเวอร์ที่นี่
        console.log('Category:', category);
        console.log('Title:', title);
        console.log('Detail:', detail);
        console.log('Location:', location);
        console.log('Files:', files);
    }

    const handleRemoveImage = (indexToRemove) => {
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(updatedFiles);

        const updatedPreviewUrls = updatedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(updatedPreviewUrls);
    }

    return (
        <div>
            <h1>Incidence</h1>
            <div className='Form-'>
                {/* Category */}
                <div className='Category'>
                    <label htmlFor="Category">Category: </label>
                    <select id="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value="incident">แจ้งเหตุ</option>
                        <option value="lost">ของหาย</option>
                    </select>
                </div>

                {/* Title */}
                <div className='Title'>
                    <label htmlFor="Title">Title: </label>
                    <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* Location */}
                <div className='Location'>
                    <label htmlFor="Location">Location: </label>
                    <select id="location" onChange={(e) => setLocation(e.target.value)}>
                        <option value="incident">ตึก1</option>
                        <option value="lost">ตึก2</option>
                        <option value="incident">ตึก3</option>
                        <option value="lost">ตึก4</option>
                    </select>
                </div>

                {/* Detail */}
                <div className='Detail'>
                    <label htmlFor="Detail">Detail: </label>
                    <input type="text" id="detail" onChange={(e) => setDetail(e.target.value)} />
                </div>

                {/* Image Preview */}
                {previewUrls.map((previewUrl, index) => (
                    <div key={index}>
                        <img src={previewUrl} alt={`Preview ${index}`} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '5px' }} />
                        <button onClick={() => handleRemoveImage(index)}>Remove</button>
                    </div>
                ))}

                {/* Upload */}
                <div>
                    <input type="file" onChange={handleFileChange} multiple accept="image/*" />
                </div>

                
            </div>
            <button className='OnSubmit' onClick={handleSubmit}>Submit</button>
            <br />
            <label className='GoBack'>back</label>
        </div>
    )
}

export default Incidence;
