import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const uploadAndResizeImage = async (path: string) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      overwrite: true,
      width: 675, // set the desired width
      height: 450, // set the desired height
      crop: "fill",
      folder: "ck",
    });
    console.log(result);
    return result.secure_url;
  } catch (err) {
    console.error(err);
  }
};
