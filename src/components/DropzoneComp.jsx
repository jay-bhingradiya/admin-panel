import { useEffect, useMemo } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

const DropzoneComp = ({ file, setFile, height, width, text }) => {
  useEffect(() => {
    if (!file.content) {
      setFile({
        ...file,
        preview: undefined,
      });
      return;
    }

    setFile({
      ...file,
      preview: URL.createObjectURL(file.content),
    });
  }, [file.content]);

  const { isDragActive, isDragAccept, isDragReject } = useDropzone();

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

  const dropzoneProps = {
    acceptedFiles: "",
    noClick: false,

    onDrop: (acceptedFiles) => {
      setFile({
        ...file,
        content: acceptedFiles[0],
      });
    },
  };

  return (
    <div height={height} width={width}>
      {file.preview ? (
        <img width="200px" src={file.preview} />
      ) : (
        <Dropzone {...dropzoneProps}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ style })}>
              {text}
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      )}
    </div>
  );
};

export default DropzoneComp;
