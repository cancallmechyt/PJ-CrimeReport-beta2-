function About() {
  const onBack = async () => {
    window.history.back();
  };

  return (
    <div>
  
      <div className="flex flex-col items-center">
        <label className="font-light text-gray-400 mb-8" id="onBack" onClick={onBack}>กลับ</label><br />
      </div>
      
    </div>
  )
}

export default About