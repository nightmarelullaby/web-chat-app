import { Router } from "express"
import { MONGODB_URI } from "../config.js";
import crypto from 'crypto';
import GridFsStorage from 'multer-gridfs-storage';
import path from "path";
import { uploadImage } from "../controllers/upload-image.controller"
const router = Router()
//Init grid engine
const storage = new GridFsStorage({
    url: MONGODB_URI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({ storage });

router.post('/upload-image',upload.single('image'),(res,res) => {
    return res.json({message:"image uploaded"})
})
return router