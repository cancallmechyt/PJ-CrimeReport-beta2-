import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../useAxios';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../firebase';

function EditForm() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { pid } = useParams();
    const [value, setValues] = useState({
        pid: pid,
        Title: '',
        Detail: '',
        Category: '',  
        Locations: '',
        Images: ''
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
                    Locations: postData[0].Locations,
                    Images: postData[0].Images
                });
            } catch (err) { console.log(err); }
        }; fetchData();
    }, [pid]);

    const handleDeleteImage = async () => {
        const isConfirmed = window.confirm("คุณต้องการลบรูปภาพใช่หรือไม่?");
        if (isConfirmed) {
            // ตั้งค่า Images เป็นค่าว่าง
            setValues({ ...value, Images: '' });
            // ไม่ต้องตรวจสอบ URL หรือลบรูปภาพใน Firebase Storage ในกรณีนี้
            console.log("Image deleted successfully");
        }
    };
    
    //console.log(pid);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = value.Images;
            if (selectedImage) {
                const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
                await uploadBytes(imageRef, selectedImage);
                imageUrl = await getDownloadURL(imageRef);
            }

            const updatedData = { ...value, Images: imageUrl };
            await useAxios.put(`/posts/edit/${pid}`, updatedData);
            alert('อัปเดตข้อมูลสำเร็จ');
            window.location.reload();
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
            alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
        }
    };
    
    // Delete Post (Success) 
    const onDelete = async () => {
        try {
            await useAxios.delete(`/posts/${pid}`);
            window.location.href = '/list'
        } catch (error) { console.error('เกิดข้อผิดพลาดในการลบโพสต์:', error); }
    };
    
    const onBack = async () => { window.history.back();};
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]); // เมื่อมีการเลือกไฟล์ใหม่ เก็บไฟล์นั้นไว้ใน state
    };

    //console.log(value);

    return (
        <div>
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-center">
                <div className="flex items-center">
                    <p className="text-white text-lg md:text-xl font-bold">แก้ไขรายการ</p>
                </div>
            </nav> 

            <div className="p-8">
                <form className="py-4">
                    <div className="form-group">
                        <label>หัวข้อ : </label><br/>
                            <input type='text' 
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                            value={value.Title} 
                            onChange={e => setValues({...value, Title : e.target.value})}>
                        </input>
                    </div>
                    <div className="form-group" >
                        <label>รายละเอียด : </label><br/>
                            <input type='text' 
                                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
                                value={value.Detail} 
                                onChange={e => setValues({...value, Detail : e.target.value})}>
                            </input> 
                    </div>
                    <div className="form-group">
                        <label>หมวดหมู่ : </label><br />
                        <label value={value.Category}></label>
                            <select 
                            className="w-full rounded-md border border-gray-300"
                            name="category" 
                            value={value.Category} 
                            onChange={(e) => setValues({...value, Category : e.target.value})}>
                                <option value="แจ้งเหตุ">แจ้งเหตุ</option>
                                <option value="ของหาย">ของหาย</option>
                                <option value="ตามหาของ">ตามหาของ</option>
                            </select> <br />
                    </div>
                    <div className="form-group">
                        <label>สถานที่ : </label><br />
                            <select 
                            className="w-full rounded-md border border-gray-300"
                            name="location" 
                            value={value.Locations} 
                            onChange={(e) => setValues({...value, Locations : e.target.value})}>
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
                    </div>
                    <div className="form-group">
                        <input type="file" 
                        className="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-300"
                        onChange={handleImageChange} />
                    </div>
                    <div className="form-group flex justify-center items-center">
                        <div className="relative w-48 h-48 mx-auto">
                            <img 
                                src={value.Images} 
                                width="200" height="200" 
                                className="mt-4 rounded-md mb-2 mx-auto"
                                alt="ว่างเปล่า " />
                            <label 
                                className="absolute top-3 right-0 mt-2 mr-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs font-medium" 
                                onClick={handleDeleteImage}>
                                ลบรูปภาพ
                            </label>
                        </div>
                    </div>     
                </form>
            </div>
            

            <div className="flex flex-col items-center">
                <div className="flex">
                    <button className="mt-4 mr-2 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={handleSubmit}>บันทึก</button>
                    <button className="mt-4 w-auto bg-customRed text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={onDelete}>ลบ</button>
                </div>
                    <label className="font-light text-gray-400 mb-8" onClick={onBack}>กลับ</label>
            </div>


        </div>
    );
}

export default EditForm;
