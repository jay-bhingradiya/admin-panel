import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const [imgData, setImgData] = useState({ content: "", preview: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    URL.revokeObjectURL(imgData.preview);
  }, []);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles[0]) {
      setError(rejectedFiles[0].errors[0].message);
      setImgData({ content: "", preview: "" });
      return;
    }

    setImgData({
      content: acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0]),
    });
    setError("");
  }, []);

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    // multiple: false,
    maxSize: 3000000,
    onDropAccepted: () => {
      setSuccess("File Added");
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    },
  });

  const submitHandler = () => {
    // console.log("submited...");
  };

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <form onSubmit={submitHandler} className="dropzone-form">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <h4>{imgData.name}</h4>
      {imgData.preview && (
        <img
          style={{ width: "200px" }}
          src={imgData.preview.length && imgData.preview}
          alt="No Image"
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default Dropzone;
