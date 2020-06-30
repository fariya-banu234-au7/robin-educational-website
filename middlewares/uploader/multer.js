import multer from 'multer';
import path from 'path'


// it will save file in memory first
const storage = multer.memoryStorage();

// filtering image and setting for single file
const multerUploads = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if(ext != '.png' && ext != '.jpg' && ext != '.gif' && ext != '.jpeg'){
            return cb('not image', null)
        }
        cb(null, true);
    }
})
.single('image');

// error handler
const imageErrorHandler = (err, req, res, next) => {
    req.app.locals.msg = err
    return res.redirect('/upload?noImage=true')
}


export { multerUploads, imageErrorHandler };