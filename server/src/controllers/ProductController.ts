import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { get, controller, use, post, del, patch } from './decorators'
import dotenv from 'dotenv'
import { SessionData } from 'express-session'
import Product, { IFood } from '../models/product.model'
import multer from 'multer'
import {
  uploadMultipleImagesCloudinary,
  uploadSingleImageCloudinary,
} from '../utils/Cloudinary'
import { bodyValidator } from './decorators/bodyValidator'
import { isAdmin, isAuth } from '../middleware/isAuth'
import { AppError } from '../utils/AppError'
import { IUser } from '../models/user.model'
import { FormdataToJson } from '../middleware/FormdataToJson'
import { HydratedDocument, IfAny } from 'mongoose'
import { uploaderMultiple } from '../utils/Multer'
import { MultipartParser } from 'formidable/parsers'

dotenv.config({ path: path.resolve(process.cwd(), './src/.env') })

interface HasPassword {
  password: string
}

export type MulterImages =
  | {
      [fieldname: string]: Express.Multer.File[]
    }
  | Express.Multer.File[]
  | undefined

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
  },
})

const maxSize = 20 * 1000 * 1000
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype)
    let filetypes = /jpeg|jpg|png/
    let mimetype = filetypes.test(file.mimetype)
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    if (mimetype && extname) {
      return cb(null, true)
    }

    cb(
      new Error(
        'Error: File upload only supports the following filetypes: ' + filetypes
      )
    )
  },
})

// TODO  testing Products| delete , update Products | multithearding

@controller('/products')
class ProductController {
  @get('/getallproducts')
  async getProducts(req: Request, res: Response) {
    const products: IFood[] | null = await Product.find<IFood>({})
    if (!products) {
      res.status(404).json({
        success: true,
        message: `Unable to get products`,
      })
      return
    }
    res.status(404).json({
      success: true,
      products,
    })
  }

  @post('/addproduct')
  @use(isAdmin)
  @use(isAuth)
  // @bodyValidator('state', 'price', 'description', 'open', 'close', 'title')
  async addProduct(req: Request, res: Response, next: NextFunction) {
    console.log('Hello , reached add product')

    let body: typeof req.body
    let files: MulterImages = []

    const user = req.user

    uploaderMultiple(req, res, (err: any) => {
      if (err) {
        return next(new AppError('Unable to upload image', 400))
      }

      if (!req.files || req.files?.length === 0) {
        return next(new AppError('Please upload an image', 400))
      }

      files = req.files
      body = req.body
    })

    console.log(files, 'IMg is here')

    let filesPath = files
      ?.filter((file) => file !== undefined)
      .map((file) => file?.path)

    console.log(filesPath, 'filesPath')

    const image = await uploadMultipleImagesCloudinary(filesPath, next)
    if (!image) return next(new AppError('Unable to upload image', 400))

    const { state, price, description, open, close, title } = body
    const product = await Product.create<IFood>({
      user: user?._id,
      restaurant: user?.restaurant,
      title,
      state,
      price,
      description,
      time: { open, close },
      image,
    })

    res.status(200).json({
      success: true,
      product,
    })
  }

  @get('/product/:id')
  async getProduct(req: Request, res: Response, next: NextFunction) {
    // if (!req.params.id) {
    //   next(new AppError(`Unable to get id`, 400));
    //   return;
    // }
    const product: IFood | null = await Product.findById<IFood>(req.params.id)
    console.log(req.params.id)
    if (!product) {
      next(new AppError(`Unable to find the product`, 500))
      return
    }
    res.status(200).json({
      success: true,
      product,
    })
  }

  @del('/product/:id')
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    Product.findByIdAndDelete<IFood>(id, (err: any, product: IFood | null) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: `Product ${product?.title} was deleted successfully`,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: `something went wrong`,
      })
      return
    })
  }

  @patch('/product/:id')
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { update } = req.body
    Product.findByIdAndUpdate(id, update, (err: Error, product: IFood) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: `Product ${product?.title} was updated successfully`,
          product,
        })
        return
      }

      res.status(500).json({
        success: false,
        message: `something went wrong`,
      })
      return
    })
  }
}

// TODO testing Products| delete , update Products | multithearding
