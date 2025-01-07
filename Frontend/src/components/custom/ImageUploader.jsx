import React, { useEffect, useRef } from "react";
import axios from "axios";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";

const API_URL = "http://localhost:5000";

const ImageUploader = ({
  imageFile,
  setImageFile,
  uploadedImageURL,
  setUploadedImageURL,
}) => {
  const inputRef = useRef(null);

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    const response = await axios.post(
      `${API_URL}/api/admin/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      setUploadedImageURL(response.data.uploadResult.url);

      console.log(response.data.uploadResult.url);
    }
  };

  useEffect(() => {
    if (imageFile) {
      handleUploadImage();
    }
  }, [imageFile]);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      // ? console.log(e.target.files[0]);
      setImageFile(e.target.files[0]);
    }
  };

  const handleRemoveImage = (e) => {
    setImageFile(null);
    setUploadedImageURL("");

    inputRef.current.value = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      // ? console.log(e.dataTransfer.files[0]);
      setImageFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-md font-semibold my-3 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="p-2 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-100 ease-in-out"
      >
        <Input
          className="hidden"
          id="image"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32"
          >
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
            <span>Drag & Drop or Upload Image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <FileIcon className="w-8 text-primary mr-2 h-8" />

            <p className="text-sm font-medium">{imageFile.name}</p>

            <Button variant="ghost" onClick={handleRemoveImage}>
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
