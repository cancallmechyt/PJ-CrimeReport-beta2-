
function About() {
  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>เกี่ยวกับเรา</h1>
      <p>RSU Police</p>
      <button className="btn-goback" onClick={onBack}>Back</button><br />
    </div>
  )
}

export default About