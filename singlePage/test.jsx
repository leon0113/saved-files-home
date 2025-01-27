"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

const SinglePage = ({ caseType }) => {
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex gap-8">
      <div className="bg-white shadow-md flex flex-col p-4 rounded-lg border relative">
        <div className="relative w-full h-[600px]">
          {/* Main Case Image */}
          <img
            src={caseType.image}
            alt={caseType.type}
            className="w-full h-full object-cover"
          />
          {/* Overlay for Uploaded Image */}
          {uploadedImage && (
            <div className="absolute inset-0">
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={1} // Aspect ratio for the cropping area
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
              />
            </div>
          )}
          {/* Overlay for User Text */}
          {text && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-bold text-2xl bg-white/70 px-2 py-1 rounded-md">
                {text}
              </span>
            </div>
          )}
          {/* Button for Upload */}
          <label
            htmlFor="image-upload"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 text-gray-800 font-bold px-4 py-2 rounded-full shadow-md w-28 text-center cursor-pointer"
          >
            Select Photo
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <h1 className="text-2xl font-bold mt-4 text-center">
          {caseType.type} Case
        </h1>
      </div>

      <div>
        <div className="bg-white shadow-md rounded-lg border p-6">
          <h2 className="text-xl font-medium mb-2">Customize Your Case</h2>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            placeholder="Enter your text here"
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
