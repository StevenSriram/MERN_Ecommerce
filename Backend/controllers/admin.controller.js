import { uploadCloudinary } from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file?.buffer).toString("base64");

    const url = `data:${req.file?.mimetype};base64,${b64}`;
    const uploadResult = await uploadCloudinary(url);
    // ? console.log(uploadResult);

    res.status(200).json({ success: true, uploadResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
