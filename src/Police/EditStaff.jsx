import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAxios from '../useAxios';


import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../firebase';


function EditStaff() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [profile, setProfile] = useState([]); 
  const [UID, setUID] = useState([]);

    const { pid } = useParams();
    const [value, setValues] = useState({
        pid: pid,
        Title: '',
        Detail: '',
        Category: '',  
        Locations: '',
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
                    Locations: postData[0].Locations,
                    Images: postData[0].Images,
                    PostStatus: postData[0].PostStatus,
                    Note: postData[0].Note
                });
                
                const userinfo = await useAxios.get(`/members/profile/${response.data[0].userId}`);
                setProfile(userinfo.data);
                setUID(userinfo.data[0].userId);
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = value.Images;
            if (selectedImage) {
                const imageRef = ref(imageDb, `files/${Date.now()}_${selectedImage.name}`);
                await uploadBytes(imageRef, selectedImage);
                imageUrl = await getDownloadURL(imageRef);
            }

            const updatedData = { ...value, Images: imageUrl, Location: value.Locations };
            await useAxios.put(`/posts/editstaff/${pid}`, updatedData);
            await useAxios.post(`/line/success/${UID}`);
            alert('บันทึกข้อมูลเรียบร้อย');
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
    
    const onBack = async () => {
        window.history.back();
    };
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]); // เมื่อมีการเลือกไฟล์ใหม่ เก็บไฟล์นั้นไว้ใน state
    };

    //console.log(value);

    return (
        <div> 
            <nav className="w-full py-3 bg-customBlue shadow flex items-center justify-between">
                <div className="flex items-center">
                    <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Flogo.png?alt=media&token=91918240-ef82-482c-8122-00e3428d28ae"} className="h-7 w-7 ml-2 mr-3" />
                    <p className="text-white text-lg md:text-xl font-bold">หน้าสำหรับเจ้าหน้าที่การแก้ไข</p>
                </div>
                <div className="flex items-center justify-center flex-1">
                </div>
            </nav>

            <div className="p-6">
            <form>
                <div className="form-group">
                    <label>สถานะ : </label><br/>
                    <select 
                    className="w-full rounded-md border border-gray-300"
                    name="status" 
                    value={value.PostStatus} 
                    onChange={(e) => setValues({...value, PostStatus : e.target.value})}>
                        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                        <option value="รอติดตาม">รอติดตาม</option>
                    </select>
                </div>
                <div className="mt-1 form-group">
                    <label>หัวข้อ : </label>
                        <input 
                            type='text' 
                            className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
                            value={value.Title} onChange={e => setValues({...value, Title : e.target.value})}>
                        </input>
                </div>
                <div className="form-group">
                    <label>รายละเอียด : </label>
                    <textarea 
                        type='text' 
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                        value={value.Detail} onChange={e => setValues({...value, Detail : e.target.value})}>
                    </textarea>
                </div>
                <div className="form-group">
                    <label>สถานที่ : </label>
                    <select 
                    className="w-full rounded-md border border-gray-300"
                    name="Locations" 
                    value={value.Locations} onChange={(e) => setValues({...value, Locations : e.target.value})}>
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
                <label>หมายเหตุ : </label>    
                    <input 
                        type='text' 
                        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
                        value={value.Note}
                        onChange={e => setValues({...value, Note : e.target.value})}>
                    </input> 
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
                        alt="Uploaded" />
                        <label 
                            className='absolute top-3 right-0 mt-2 mr-2 bg-red-500 text-white py-1 px-2 rounded-md text-xs font-medium' 
                            onClick={handleDeleteImage}>
                            ลบรูปภาพ
                        </label>
                    </div>
                </div>
            </form>
        </div>

        <ul className="mx-auto">
            {profile.map((item, index) => (
                <li key={index} className="text-center">
                    <p className="font-bold">ข้อมูลผู้โพส</p>
                    <p className="text-center">{item.Fname + " " + item.Lname}</p>
                    <p className="text-center">{item.College}</p>
                </li>
            ))}
        </ul>

        <div className="flex flex-col items-center">
            <div className="flex">
                <button className="mt-4 mr-2 w-auto bg-customBlue text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={handleSubmit}>บันทึก</button>
                <button className="mt-4 w-auto bg-customRed text-white p-2 rounded-lg mb-2 hover:bg-customYellow hover:text-white hover:border hover:border-gray-300" onClick={onDelete}>ลบ</button> <br />
            </div>
                <label className="font-light text-gray-400 mb-8" onClick={onBack} >Back</label>        
        </div>

        <div className="fixed bottom-0 w-full">
            <nav className="w-full py-3 bg-customBlue shadow flex justify-around">
                <div className="flex items-center "> 
                    <Link to="/home">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fhome.png?alt=media&token=e9d3ab3c-248b-48f2-9c19-7f68c01af147"} alt="Home" className="h-7 w-7" />
                    </Link>
                    </div>
                    <div className="flex items-center"> 
                    <Link to="/form">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fedit.png?alt=media&token=2daa0539-cec5-4519-a554-c2416380473d"} alt="Edit" className="h-7 w-7" />
                    </Link>
                    </div>
                    <div className="flex items-center"> 
                        <Link to="/staffhome">
                            <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fpolice.png?alt=media&token=546b38b4-b06d-42ac-8497-bc37ffeed2ba"} alt="Edit" className="h-7 w-7" />
                        </Link>
                    </div>                  
                    <div className="flex items-center"> 
                    <Link to="/list">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fmine.png?alt=media&token=67ba893f-9aac-44c2-adaa-c7044947399e"} alt="Mine" className="h-7 w-7" />
                    </Link>
                    </div>
                    <div className="flex items-center"> 
                    <Link to="/profile">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/firevase-crud.appspot.com/o/files%2Fprofile.png?alt=media&token=b459073e-d0d7-40dc-9430-e211e671ee79"} alt="Profile" className="h-7 w-7" />
                    </Link>
                </div>
            </nav>
        </div>                

    </div>
);}

export default EditStaff