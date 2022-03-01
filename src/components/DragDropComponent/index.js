import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import UploadComponent from "../UploadComponent";

const filesTypes = ["JPG", "PNG", "GIF"];

const DragDropComponent = ({ handleChange }) => {
  const [status, setStatus] = useState("normal");
  const [messageState, setMessageState] = useState(
    "Adicione seus arquivos aqui ..."
  );
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      hoverTitle={""}
      types={filesTypes}
      multiple={false}
      onTypeError={(err) => {
        setStatus("danger");
        setMessageState("Tipo de arquivo não suportado.");
      }}
      onDraggingStateChange={(drag) => {
        if (drag === true) {
          setStatus("success");
          setMessageState("Solte seus arquivos.");
        } else {
          setStatus("normal");
          setMessageState("Adicione seus arquivos aqui ...");
        }
      }}
    >
      <UploadComponent message={messageState} status={status} />
    </FileUploader>
  );
};

export default DragDropComponent;
