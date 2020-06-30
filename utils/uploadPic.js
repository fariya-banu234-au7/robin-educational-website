import pkg from 'cloudinary';
const { v2:cloudinary } = pkg;

// import dotenv from 'dotenv';
// dotenv.config();
import { api_key, api_secret, cloud_name } from '../config/cloudinary.js'

// config for cloudinary
cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

// console.log(process.env.CLOUDNIARY_API, process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_SECRET)

const fileUploader = (path) => {
    return new Promise((res, rej) => {
        cloudinary.uploader.upload(path, (err, file) => {
            if(err) return rej(err);
            res(file);
        });
    });
};

export default fileUploader;