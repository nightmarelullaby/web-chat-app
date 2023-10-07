import { Router } from "express"
import { MONGODB_URI } from "../config.js";
import crypto from 'crypto';
import {GridFsStorage} from 'multer-gridfs-storage';
import path from "path";
import multer from 'multer';
import mongoose from "mongoose";
import { uploadImage } from "../controllers/upload-image.controller.js"
import {gfs,bucket} from "../db.js"
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

router.get('/image/:filename', async (req, res) => {

  gfs.files.findOne({ filename: req.params.filename }).then(async (file )=> {
    // Check if file exists
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if its image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {

      //creat new stream
      const stream = bucket.openDownloadStreamByName(file.filename)

      stream.on('data',chunk => {
        res.write(chunk)
      })
      stream.on('error',chunk => {
        res.status(400).json({message:"There was an error"})
      })
      stream.on('end',chunk => {
        res.end()
      })
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
  })

router.post('/upload-image',upload.single('image'),(req,res) => {
    return res.json({message:req.file.filename})
})
export default router