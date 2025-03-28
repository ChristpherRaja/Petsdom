import multer from 'multer';
import path from 'path'

export const profileUpload = ()=>{
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'Backend/uploads/profile');
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        },
    })
    return multer({ storage: storage });
}