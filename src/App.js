import React, { useState, useCallback } from "react";
import filesize from "filesize";
import { uniqueId } from "lodash";

import "react-circular-progressbar/dist/styles.css";
import "./styles.css";

import api from "./services/api";
import FilesListComponent from "./components/FilesList";
import DragDropComponent from "./components/DragDropComponent";

export default function App() {
  const [files, setFiles] = useState([]);

  const handleChange = (file) => {
    const objectFile = {
      id: uniqueId(),
      name: file[0].name,
      readableSize: filesize(file[0].size),
      uploaded: false,
      preview: URL.createObjectURL(file[0]),
      file: file[0],
      progress: 0,
      error: false,
      url: null,
    };
    setFiles([...files, objectFile]);

    processUpload(objectFile);
  };

  const updateFile = useCallback((id, data) => {
    setFiles((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = useCallback(
    (uploadFile) => {
      const data = new FormData();
      data.append("file", uploadFile.file, uploadFile.name);

      api
        .post("/upload", data, {
          onUploadProgress: (progressEvent) => {
            let progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            updateFile(uploadFile.id, { progress });
          },
        })
        .then((response) => {
          updateFile(uploadFile.id, {
            uploaded: true,
            id: response.data._id,
            url: response.data.url,
          });
        })
        .catch((err) => {
          updateFile(uploadFile.id, {
            error: true,
          });
        });
    },
    [updateFile]
  );

  const handleDelete = useCallback(async (id) => {
    await api.delete(`/upload/${id}`);
    setFiles((state) => state.filter((file) => file.id !== id));
  }, []);

  return (
    <div className="App">
      <DragDropComponent handleChange={handleChange} />
      <br />
      <hr />
      <br />
      <FilesListComponent files={files} handleDelete={handleDelete} />
    </div>
  );
}
