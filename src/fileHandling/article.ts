import multer  from 'multer';

const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => { // setting destination of uploading files  
        
            cb(null, req.Path);
        },
        filename: (req, file, cb) => { // naming file
        const fileExtension = file.originalname.split('.')[1]
        cb(null,  file.fieldname + '.' +fileExtension);
        }
    });
    
const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.fieldname === "image") { // if uploading resume
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) { // check file type to be pdf, doc, or docx
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
        } else { // else uploading image
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/html'
        ) { // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }
        }
    };
    const upload =(
        multer(
        { 
            storage: fileStorage, 
            limits:
            { 
                fileSize:'2mb' 
            }, 
            fileFilter: fileFilter 
        }
        ).fields(
        [
            { 
            name: 'body', 
            maxCount: 1 
            }, 
            { 
            name: 'image', 
            maxCount: 1 
            }
        ]
        )
    );
export default upload;