function Guide() {
  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>แนะนำการใช้งาน</h1>
      <button className="btn-goback" onClick={onBack}>Back</button><br />
    </div>
  )
}

export default Guide