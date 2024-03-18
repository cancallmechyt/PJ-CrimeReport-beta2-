import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios';

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { imageDb } from '../firebase';

function EditForm() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { Post_id } = useParams();
    const [value, setValues] = useState({
        Post_id: Post_id,
        title: '',
        detail: '',
        category: '',  
        location: '',
        image: ''
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAxios.get(`/post/incident/${Post_id}`);
                const postData = response.data; 
                setValues({
                    ...value,
                    title: postData[0].title,
                    detail: postData[0].detail,
                    category: postData[0].category, 
                    location: postData[0].location,
                    images: postData[0].images
                });
            } catch (err) { console.log(err); }
        }; fetchData();
    }, [Post_id]);

    const handleDeleteImage = async () => {
        
        const isConfirmed = window.confirm("คุณต้องการลบรูปภาพใช่หรือไม่?");
        if (isConfirmed) {
            setValues({ ...value, images: '' });
            // ตรวจสอบว่า URL ของรูปภาพไม่ว่างเปล่า
            if (value.images !== '') {
                try {
                    // สร้างอ้างอิงไปยังรูปภาพใน Firebase Storage
                    const imageRef = imageDb.refFromURL(value.images);
    
                    // ลบรูปภาพใน Firebase Storage
                    await deleteObject(imageRef);
    
                    console.log("Image deleted successfully");
                } catch (error) {
                    console.error("Error deleting image:", error);
                }
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = value.images; // เก็บ URL ของรูปภาพเดิม
            if (selectedImage) { // ถ้ามีการเลือกรูปใหม่
                const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
                await uploadBytes(imageRef, selectedImage);
                imageUrl = await getDownloadURL(imageRef); // รับ URL ของรูปภาพใหม่
    
                // เช็คว่ามี URL ของรูปภาพเดิมหรือไม่
                if (value.images) {
                    // หาชื่อไฟล์ของรูปเดิมจาก URL
                    const oldFileName = value.images.split('/').pop();
                    // สร้าง reference ของรูปเดิม
                    const oldImageRef = ref(imageDb, `files/${oldFileName}`);
                    try {
                        // ลบรูปเดิมออกจาก Firebase Storage
                        await deleteObject(oldImageRef);
                        console.log('ลบรูปเดิมออกจาก Firebase Storage สำเร็จ');
                    } catch (deleteError) {
                        console.error('เกิดข้อผิดพลาดในการลบรูปเดิม:', deleteError);
                    }
                }
            }
    
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            const updatedData = { ...value, images: imageUrl };
            await useAxios.put(`/post/incident/${Post_id}`, updatedData);
            console.log('อัปเดตข้อมูลสำเร็จ');
            window.location.reload();
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };
    
    const onDelete = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm('คุณต้องการลบโพสต์นี้ใช่หรือไม่?');
        if (isConfirmed) {
            try {
                // ทำการลบโพสต์โดยใช้ API หรือเซิร์ฟเวอร์
                await useAxios.delete(`/post/post/${Post_id}`);
                console.log('ลบโพสต์สำเร็จ');
                alert('ลบโพสต์สำเร็จแล้ว');
                window.location.href = '/list';
                // หลังจากลบโพสต์สำเร็จ คุณสามารถทำการรีเฟรชหน้าหรือทำการอัปเดตข้อมูลตามที่ต้องการ
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการลบโพสต์:', error);
                alert('เกิดข้อผิดพลาดในการลบโพสต์');
            }
        } else {
            console.log('ยกเลิกการลบโพสต์');
        }
    };
    
    const onBack = async () => {
        window.history.back();
    };
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]); // เมื่อมีการเลือกไฟล์ใหม่ เก็บไฟล์นั้นไว้ใน state
    };

    console.log(value);

    return (
        <div>
            <h1>EditForm</h1>
            <form>
                <label>Title: </label>
                <input type='text' className='title' value={value.title} onChange={e => setValues({...value, title : e.target.value})}></input> <br />
                <label>Detail: </label>
                <input type='text' className='detail' value={value.detail} onChange={e => setValues({...value, detail : e.target.value})}></input> <br />
                <label>Category: </label>
                <label value={value.category}></label>
                <select name="category" value={value.category} onChange={(e) => setValues({...value, category : e.target.value})}>
                    <option value="incident">incident</option>
                    <option value="ของหาย">ของหาย</option>
                    <option value="finditem">finditem</option>
                </select> <br />
                <label>Location: </label>
                <select name="location" value={value.location} onChange={(e) => setValues({...value, location : e.target.value})}>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                    <option value="B3">B3</option>
                </select> <br />  
                <label>Images</label> <br />
                <img src={value.images} width="100" height="100" alt="Uploaded" />
                <label className='del' onClick={handleDeleteImage}>x</label> <br />
                <input type="file" onChange={handleImageChange} /><br />
            </form>
            <button className='submit' onClick={handleSubmit}>Submit</button>
            <button className='delete' onClick={onDelete}>Delete</button> <br />
            <label onClick={onBack} >Back</label>
        </div>
    );
}

export default EditForm;
