import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads");
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.replace(/\s+/g, "-");
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf"){
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten archivos .pdf") , false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const handleFileSizeLimit = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ message: "El tamaño del archivo excede el limite de 5 MB" });
    } else if (err) {
        res.status(400).json({ message: err.message });
    } else {
        next();
    }
};

export { upload, handleFileSizeLimit }; 