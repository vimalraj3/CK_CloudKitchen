import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { NextFunction } from 'express'
import { AppError } from './AppError'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

export const uploadSingleImageCloudinary = async (
  path: string,
  next: NextFunction
): Promise<string | void> => {
  try {
    const result: UploadApiResponse | undefined =
      await cloudinary.uploader.upload(
        path,
        { format: 'webp', upload_preset: process.env.CLOUDINARY_PRESET },
        (error, result) => {
          if (error) {
            return next(new AppError(`Something went wrong`, 500))
          }
          return result
        }
      )
    if (result) return result.secure_url
  } catch (err) {
    return next(new AppError(`Something went wrong`, 500))
  }
}

export const uploadMultipleImagesCloudinary = async (
  paths: string[],
  next: NextFunction
): Promise<string[] | void> => {
  try {
    const results: (UploadApiResponse | undefined)[] = await Promise.all(
      paths.map((path: string) =>
        cloudinary.uploader.upload(
          path,
          { upload_preset: process.env.CLOUDINARY_PRESET },
          (error, result) => {
            if (error) {
              next(new AppError(`Something went wrong`, 500))
              return 'error'
            }
            return result
          }
        )
      )
    )

    return results
      .filter((result) => result !== undefined)
      .map((result) => (result as UploadApiResponse).secure_url)
  } catch (err) {
    next(new AppError(`Something went wrong`, 500))
  }
}
