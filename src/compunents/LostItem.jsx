
function LostItem() {
  
  const onBack = async () => {
    window.location.href = '/home';
  };

  return (
    <div>
      <h1>LostItem</h1>
      <button className="btn-submit" onClick={onBack}>Back</button><br />
    </div>
  )
}

export default LostItem