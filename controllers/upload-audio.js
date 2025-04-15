const multer = require("multer");
const path = require("path");
const fs = require("fs");
const randomstring = require("randomstring");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../audio-cerpen");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = path.basename(file.originalname, extension);
        const random = randomstring.generate(7);
        const timestamp = Date.now(); 
        const newFilename = `${filename}_${timestamp}_${random}${extension}`;
        cb(null, newFilename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maksimum 5MB
    },
    fileFilter: (req, file, cb) => {
        const acceptedTypes = [
            "image/jpg", "image/jpeg", "image/png",
            "audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg"
        ];

        if (!acceptedTypes.includes(file.mimetype)) {
            return cb(new Error(`Invalid file type (${file.mimetype})`));
        }
        cb(null, true);
    }
});

module.exports = upload;
