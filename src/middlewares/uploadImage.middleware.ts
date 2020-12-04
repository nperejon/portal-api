import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
            if(err){
                cb(err, file.filename)
            }else{
                const originalName = file.originalname.toLowerCase()
                const fileName = `${hash.toString('hex')}-${originalName}`
                cb(null, fileName)
            }
        })
    }
})

const uploadImage = multer({ 
    storage: storage,
    limits: {
        fieldSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if(allowMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error('Invalid form'))
        }
    }
})

export default uploadImage.single('avatar');