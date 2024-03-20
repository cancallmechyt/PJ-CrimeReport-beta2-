import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios';

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { imageDb } from '../firebase';


function EditStaff() {
  const [selectedImage, setSelectedImage] = useState(null);
    const { pid } = useParams();
    const [value, setValues] = useState({
        pid: pid,
        Title: '',
        Detail: '',
        Category: '',  
        Location: '',
        Images: '',
        PostStatus: '',
        Note: ''
    });
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await useAxios.get(`/posts/${pid}`);
                const postData = response.data; 
                setValues({
                    ...value,
                    Title: postData[0].Title,
                    Detail: postData[0].Detail,
                    Category: postData[0].Category, 
                    Location: postData[0].Location,
                    Images: postData[0].Images,
                    PostStatus: postData[0].PostStatus,
                    Note: postData[0].Note
                });
            } catch (err) { console.log(err); }
        }; fetchData();
    }, [pid]);

    const handleDeleteImage = async () => {
        
        const isConfirmed = window.confirm("คุณต้องการลบรูปภาพใช่หรือไม่?");
        if (isConfirmed) {
            setValues({ ...value, Images: '' });
            // ตรวจสอบว่า URL ของรูปภาพไม่ว่างเปล่า
            if (value.Images !== '') {
                try {
                    // สร้างอ้างอิงไปยังรูปภาพใน Firebase Storage
                    const imageRef = imageDb.refFromURL(value.Images);
    
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
            let imageUrl = value.Images; // เก็บ URL ของรูปภาพเดิม
            if (selectedImage) { // ถ้ามีการเลือกรูปใหม่
                const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
                await uploadBytes(imageRef, selectedImage);
                imageUrl = await getDownloadURL(imageRef); // รับ URL ของรูปภาพใหม่
    
                // เช็คว่ามี URL ของรูปภาพเดิมหรือไม่
                if (value.Images) {
                    // หาชื่อไฟล์ของรูปเดิมจาก URL
                    const oldFileName = value.Images.split('/').pop();
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
            const updatedData = { ...value, Images: imageUrl, Location: value.Location };
            await useAxios.put(`/posts/edit/${pid}`, updatedData);
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
                await useAxios.delete(`/posts/${pid}`);
                console.log('ลบโพสต์สำเร็จ');
                alert('ลบโพสต์สำเร็จแล้ว');
                window.history.back();
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
            <h1>EditStaff</h1>
            <form>
                <label>สถานะ : </label>
                <select name="status" value={value.PostStatus} onChange={(e) => setValues({...value, PostStatus : e.target.value})}>
                    <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                    <option value="รอติดตาม">รอติดตาม</option>
                </select> <br />
                <label>หัวข้อ : </label>
                <input type='text' className='title' value={value.Title} onChange={e => setValues({...value, Title : e.target.value})}></input> <br />
                <label>รายละเอียด : </label>
                <input type='text' className='detail' value={value.Detail} onChange={e => setValues({...value, Detail : e.target.value})}></input> <br />
                <label>หมวดหมู่ : </label>
                <label value={value.Category}></label>
                <select name="Category" value={value.Category} onChange={(e) => setValues({...value, Category : e.target.value})}>
                    <option value="แจ้งเหตุ">แจ้งเหตุ</option>
                    <option value="ของหาย">ของหาย</option>
                    <option value="ตามหาของ">ตามหาของ</option>
                </select> <br />
                <label>สถานที่ : </label>
                <select name="Location" value={value.Location} onChange={(e) => setValues({...value, Location : e.target.value})}>
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
                </select> <br />  
                <label>Images</label> <br />
                <img src={value.Images} width="100" height="100" alt="Uploaded" />
                <label className='del' onClick={handleDeleteImage}>x</label> <br />
                <input type="file" onChange={handleImageChange} /><br />
                <label>หมายเหตุ : </label>
                <input type='text' className='note' value={value.Note} onChange={e => setValues({...value, Note : e.target.value})}></input> <br />
            </form>
            <button className='submit' onClick={handleSubmit}>Submit</button>
            <button className='delete' onClick={onDelete}>Delete</button> <br />
            <label onClick={onBack} >Back</label>
        </div>
    );
}

export default EditStaff