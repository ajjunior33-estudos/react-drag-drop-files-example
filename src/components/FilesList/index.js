import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

const FilesListComponent = ({ files, handleDelete }) => {
  return (
    <ul>
      {files.map((element) => {
        return (
          <li key={element.id}>
            <div className="fileInfo">
              <div
                style={{ backgroundImage: `url(${element.preview})` }}
                className="preview"
              ></div>
              <div>
                <strong>{element.name}</strong>
                <span>
                  {element.readableSize}
                  {element.url && (
                    <button onClick={() => handleDelete(element.id)}>
                      Excluir
                    </button>
                  )}
                </span>
              </div>
            </div>
            <div>
              {!element.uploaded && !element.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: "#7159c1" },
                  }}
                  strokeWidth={10}
                  value={element.progress}
                />
              )}

              {element.url && (
                <a href={element.url} target="_blank" rel="noopener noreferrer">
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}
              {element.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
              {element.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default FilesListComponent;
