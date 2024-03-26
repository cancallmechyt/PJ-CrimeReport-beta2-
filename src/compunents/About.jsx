function About() {
  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>
      <img src='./pic.jpg'/> 

      <div className="max-w-lg mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">ช่องทางการติดต่อ</h1>
        <div className="space-y-2">
          <p>สำนักงานตำรวจมหาวิทยาลัยรังสิต ตึก 9 ชั้น 2</p>
          <p>ในเวลาทำการ จันทร์ - ศุกร์ เวลา 08.30 - 16.30 น.</p>
          <p>งานธุรการ โทร. <a href="tel:2550">2550</a>, <a href="tel:2558">2558</a>, <a href="tel:2850">2850</a></p>
          <p>งานศูนย์ CCTV และ วิทยุ โทร. <a href="tel:2555">2555</a>, <a href="tel:1191">1191</a></p>
          <p>โทรศัพท์ : <a href="tel:02-997-2200">02-997-2200</a> ต่อ <a href="tel:2550">2550</a>, <a href="tel:2558">2558</a>, <a href="tel:2850">2850</a></p>
          <p>โทรสาร : <a href="tel:02-997-2200">02-997-2200</a> ต่อ <a href="tel:2557">2557</a></p>
          <p>เบอร์โทร.สายด่วนบริการ 24 ชม. <a href="tel:02-791-5775">02-791-5775</a></p>
          <p>Email : <a href="mailto:police@rsu.ac.th">police@rsu.ac.th</a></p>
          <p>Facebook : <a href="https://www.facebook.com/สำนักงานตำรวจมหาวิทยาลัยรังสิต">สำนักงานตำรวจมหาวิทยาลัยรังสิต</a></p>
        </div>
      </div>
    </div>
  )
}

export default About