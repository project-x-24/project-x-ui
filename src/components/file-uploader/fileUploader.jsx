import * as React from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  onFileSelect,
  className = "",
  multiple = false,
  accept,
}) => {
  const defaultStyles = `w-96 min-h-200px bg-light border border-gray-300 border-dashed rounded ${className}`;
  const onDrop = React.useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      onFileSelect(acceptedFiles);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept,
  });
  const { onClick, ...rootProps } = getRootProps();
  const inputProps = getInputProps();
  return (
    <div {...rootProps} className={defaultStyles} style={{ marginTop: "50px" }}>
      <input {...inputProps} />
      <div className="mt-4 d-flex w-full flex-column flex-center fs-6 text-muted ">
        <div> Drag & drop here</div>
        <div className="mt-4"> OR </div>
        <button
          type="button"
          className="btn btn-primary mt-4 btn-active-light-primary"
          onClick={onClick}
        >
          Click here to upload a file
        </button>

        <div className="mt-4"> Maximum 100 MB </div>
      </div>
    </div>
  );
};

export default FileUploader;
