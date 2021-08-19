import React, { useCallback, useEffect, useMemo, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

const MultiImgOneDrop = () => {
  const [imgData, setImgData] = useState({ content: "", preview: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    URL.revokeObjectURL(imgData.preview);
  }, []);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    console.log(rejectedFiles);
    if (rejectedFiles[0]) {
      setError(rejectedFiles[0].errors[0].message);
      setImgData({ content: "", preview: "" });
      return;
    }
    let newUrl = [];
    acceptedFiles.forEach((file, key) => {
      let imageURL = URL.createObjectURL(file);
      newUrl.push(imageURL);
    });

    setAllImages(newUrl);
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
    // maxSize: 3000000,
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
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>

      <div className="images" style={{ marginTop: "30px" }}></div>
      {allImages.map((url, key) => (
        <img
          key={key}
          style={{ width: "200px", marginLeft: "10px" }}
          src={url}
          alt={`No Image - ${key}`}
        />
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default MultiImgOneDrop;
