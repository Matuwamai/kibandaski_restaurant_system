import React, { useState } from "react";

const CameraInput = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    document.getElementById("cameraInput").click();
  };

  return (
    <div className='my-3'>
      <label htmlFor='cameraInput'>
        {imagePreview ? (
          <img
            src={imagePreview}
            alt='Preview'
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        ) : (
          <div
            style={{
              border: "2px dashed #ddd",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={openCamera}
          >
            <p>Click to take a picture</p>
          </div>
        )}
      </label>
      <input
        type='file'
        accept='image/*'
        capture='camera'
        id='cameraInput'
        style={{ display: "none" }}
        onChange={handleImage}
      />
    </div>
  );
};

export default CameraInput;
