import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function CameraCapture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    startCamera();
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], "captured_image.png", { type: "image/png" });
        uploadImage(file);
      }, "image/png");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response);
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100vw", alignItems: "center" }}>
      <video style={{ margin: "auto" }} ref={videoRef} autoPlay playsInline width="400" height="300"></video>
      <button style={{ width: "fit-content" }} onClick={captureImage}>
        Capture Image
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
