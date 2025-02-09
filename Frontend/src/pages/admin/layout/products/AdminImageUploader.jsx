import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { CloudSnow, FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";

import {
  uploadImage,
  deleteImage,
  clearImageURL,
} from "../../../../store/slices/adminSlice";

const AdminImageUploader = ({ imageFile, setImageFile, editMode }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { imageLoading, uploadedImageURL } = useSelector(
    (state) => state.admin
  );

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    dispatch(uploadImage(formData));
  };

  /*
    PublicId :  id2sd8p3wqken5y9ufqg
  http://res.cloudinary.com/dv0w9co1u/image/upload/v1736531914/id2sd8p3wqken5y9ufqg.png
  */

  // ? console.log(uploadedImageURL);

  useEffect(() => {
    if (imageFile && !uploadedImageURL) {
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
    dispatch(clearImageURL());

    // ! Remove Image From Cloudinary
    const [folderName, fileName] = uploadedImageURL.split("/").slice(-2);
    const publicId = `${folderName}/${fileName.split(".")[0]}`;
    dispatch(deleteImage(publicId));

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
        className={`${
          editMode ? "cursor-not-allowed" : "cursor-pointer"
        } w-full p-2 border-2 border-dashed border-slate-200 rounded-lg hover:bg-slate-100 transition duration-100 ease-in-out`}
      >
        <Input
          className="hidden"
          id="image"
          type="file"
          ref={inputRef}
          onChange={handleImageChange}
        />

        {!imageFile ? (
          editMode ? (
            <CloudSnow className="animate-pulse mx-auto w-12 h-12 text-red-500 mt-3 mb-2" />
          ) : (
            <Label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-32"
            >
              <UploadCloud className="w-12 h-12 text-muted-foreground mb-2" />
              <span>Drag & Drop or Upload Image</span>
            </Label>
          )
        ) : imageLoading ? (
          <UploadCloud className="animate-pulse mx-auto w-12 h-12 text-green-500 mt-3 mb-2" />
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

export default AdminImageUploader;
