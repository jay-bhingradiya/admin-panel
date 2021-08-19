import React, { useState } from "react";
import Dropzone from "react-dropzone";

const Dropzone2 = () => {
  const [imgData1, setImgData1] = useState({ content: "", preview: "" });
  const [imgData2, setImgData2] = useState({ content: "", preview: "" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div>
      <Dropzone onDrop={(acceptedFiles) => console.log("file 1")}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      <Dropzone onDrop={(acceptedFiles) => console.log("file 2")}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default Dropzone2;
