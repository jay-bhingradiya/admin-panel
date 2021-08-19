import React, { useState } from "react";
import DropzoneComp from "./DropzoneComp";

const MultiDropSingleImg = () => {
  const [profileImg, setProfileImg] = useState({
    content: "",
    preview: "",
  });
  const [proofImg, setProofImg] = useState({
    content: "",
    preview: "",
  });
  return (
    <div>
      <DropzoneComp
        file={profileImg}
        setFile={setProfileImg}
        text="Upload Profile Img"
      />
      {/* <img src={profileImg.preview} width="200px" alt="Profile Not found" /> */}
      <DropzoneComp
        file={proofImg}
        setFile={setProofImg}
        text="Upload Document Img"
      />
    </div>
  );
};

export default MultiDropSingleImg;
