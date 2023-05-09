import { NextFunction, Request, Response } from "express";
import path from "path";
import { get, controller, use, post, del, patch } from "./decorators";
import dotenv from "dotenv";
import { SessionData } from "express-session";
import Product, { IProduct } from "../models/product.model";
import multer from "multer";
import { uploadAndResizeImage } from "../utils/Cloudinary";
import { bodyValidator } from "./decorators/bodyValidator";
import { isAuth } from "../middleware/isAuth";
import { AppError } from "../utils/AppError";
import { IUser } from "../models/user.model";
import { FormdataToJson } from "../middleware/FormdataToJson";

dotenv.config({ path: path.resolve(process.cwd(), "./src/.env") });

interface HasPassword {
  password: string;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const maxSize = 20 * 1000 * 1000;
const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize,
  },
  fileFilter: function (req, file, cb) {
    console.log(file.mimetype);
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      new Error(
        "Error: File upload only supports the following filetypes: " + filetypes
      )
    );
  },
});

// TODO  testing Products| delete , update Products | multithearding

@controller("/products")
class ProductController {
  @get("/getallproducts")
  async getProducts(req: Request, res: Response) {
    const products: IProduct[] | null = await Product.find<IProduct>({});
    if (!products) {
      res.status(404).json({
        success: true,
        message: `Unable to get products`,
      });
      return;
    }
    res.status(404).json({
      success: true,
      products,
    });
  }

  @post("/addproduct")
  @use(upload.single("image"))
  // @use(ProductController.upload.single("image"))
  // @use(isAuth)
  // @use(FormdataToJson)
  @bodyValidator("state", "price", "description", "open", "close", "title")
  async addProduct(req: Request, res: Response) {
    const { title, state, price, description, open, close } = req.body;
    const user = "";

    const imgPath = req.file?.path;
    console.log(imgPath, "IMg dfurl");

    if (!imgPath) {
      res.status(404).json({
        success: false,
        message: `Invalid input`,
      });
      return;
    }

    uploadAndResizeImage(imgPath)
      .then(async (image) => {
        const product: IProduct = await Product.create({
          user,
          title,
          state,
          price,
          description,
          time: { open, close },
          image,
        });
        res.status(200).json({
          success: true,
          product,
        });
      })
      .catch((err) => {
        res.status(200).json({ success: false, message: err.message });
      });
  }

  @get("/product/:id")
  async getProduct(req: Request, res: Response, next: NextFunction) {
    // if (!req.params.id) {
    //   next(new AppError(`Unable to get id`, 400));
    //   return;
    // }
    const product: IProduct | null = await Product.findById<IProduct>(
      req.params.id
    );
    console.log(req.params.id);
    if (!product) {
      next(new AppError(`Unable to find the product`, 500));
      return;
    }
    res.status(200).json({
      success: true,
      product,
    });
  }

  @del("/product/:id")
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    Product.findByIdAndDelete<IProduct>(
      id,
      (err: any, product: IProduct | null) => {
        if (!err) {
          res.status(200).json({
            success: true,
            message: `Product ${product?.title} was deleted successfully`,
          });
          return;
        }

        res.status(500).json({
          success: false,
          message: `something went wrong`,
        });
        return;
      }
    );
  }

  @patch("/product/:id")
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { update } = req.body;
    Product.findByIdAndUpdate(id, update, (err: Error, product: IProduct) => {
      if (!err) {
        res.status(200).json({
          success: true,
          message: `Product ${product?.title} was updated successfully`,
          product,
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: `something went wrong`,
      });
      return;
    });
  }
}
