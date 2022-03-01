import "./styled.css";
const UploadComponent = ({ message, status }) => {
  return (
    <div className={`dropzone ${status}`}>
      <p>{message} </p>
    </div>
  );
};
export default UploadComponent;
