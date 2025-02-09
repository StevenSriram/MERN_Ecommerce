import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { ImageUp, Loader, Trash2, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import {
  uploadImage,
  deleteImage,
  clearImageURL,
} from "../../../../store/slices/adminSlice";
import {
  addBanner,
  deleteBanner,
  getBanners,
} from "@/store/slices/featureSlice";

const BannerUploader = ({ imageFile, setImageFile }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { imageLoading, uploadedImageURL } = useSelector(
    (state) => state.admin
  );
  const { loading } = useSelector((state) => state.feature);
  const [title, setTitle] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (imageFile && !uploadedImageURL) {
      handleUploadImage();
    }
  }, [imageFile]);

  const handleAddBanner = (e) => {
    e.preventDefault();
    if (!title || !uploadedImageURL) return;

    dispatch(
      addBanner({
        title,
        image: uploadedImageURL,
      })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(getBanners());
        toast({
          title: data.payload?.message,
        });
      }
    });

    setImageFile(null);
    setTitle("");
    dispatch(clearImageURL());
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("imageFile", imageFile);

    dispatch(uploadImage(formData));
  };

  const handleRemoveImage = (e) => {
    setImageFile(null);
    dispatch(clearImageURL());

    const [folderName, fileName] = uploadedImageURL.split("/").slice(-2);
    const publicId = `${folderName}/${fileName.split(".")[0]}`;

    dispatch(deleteImage(publicId));

    inputRef.current.value = null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Label className="text-lg font-semibold my-3 block">Upload Banner</Label>
      <div
        onDragOver={(e) => {
          if (e.dataTransfer.files?.[0]) setImageFile(e.dataTransfer.files[0]);
        }}
        className="flex items-center justify-center cursor-pointer w-full h-[160px] p-2 border-2 border-dashed border-slate-200 rounded-lg hover:bg-slate-100 transition duration-100 ease-in-out"
      >
        <Input
          className="hidden"
          id="image"
          type="file"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) setImageFile(e.target.files[0]);
          }}
        />

        {!imageFile ? (
          <Label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-32"
          >
            <ImageUp className="w-16 h-16 text-muted-foreground mb-6" />
            <span>Drag & Drop or Upload Image</span>
          </Label>
        ) : imageLoading ? (
          <ImageUp className="animate-pulse mx-auto w-24 h-24 text-green-500 mt-3 mb-2" />
        ) : (
          <div className="flex flex-col relative items-center justify-center w-full h-32">
            <img
              className="w-[75%] h-32 object-cover"
              src={uploadedImageURL}
              alt="preview"
            />
            <XIcon
              className="w-6 h-6 z-10 absolute top-1 right-2 cursor-pointer"
              onClick={handleRemoveImage}
            />
          </div>
        )}
      </div>
      <Label className="text-lg font-semibold mt-3 block">Banner Title</Label>
      <Input
        type="text"
        placeholder="Enter Title for Banner ..."
        className="mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        className="mt-5 w-full bg-slate-900 hover:bg-slate-800"
        onClick={handleAddBanner}
      >
        {loading ? <Loader className="animate-spin" /> : "Add Banner"}
      </Button>
    </div>
  );
};

const AdminBanner = () => {
  const [imageFile, setImageFile] = useState(null);
  const { toast } = useToast();

  const dispatch = useDispatch();
  const { bannerList } = useSelector((state) => state.feature);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleDeleteBanner = (bannerId, bannerImage) => {
    const [folderName, fileName] = bannerImage.split("/").slice(-2);
    const publicId = `${folderName}/${fileName.split(".")[0]}`;

    dispatch(deleteBanner(bannerId)).then((data) => {
      if (data.payload?.success) {
        dispatch(deleteImage(publicId));

        toast({
          title: data.payload?.message,
        });

        dispatch(getBanners());
      }
    });
  };

  return (
    <>
      <BannerUploader imageFile={imageFile} setImageFile={setImageFile} />
      <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto mt-10">
        {bannerList.length > 0 &&
          bannerList.map((banner) => (
            <div key={banner._id} className="border-2 rounded-lg p-2">
              <div className="flex items-center relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full object-cover"
                />
                <Trash2
                  onClick={() => handleDeleteBanner(banner._id, banner.image)}
                  className="absolute cursor-pointer text-red-500 hover:text-red-600 top-2 right-2 w-6 h-6"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminBanner;
