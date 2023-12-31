import asyncHandler from "../middleware/asyncHandler.js";
import cloudinary from 'cloudinary'

const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ msg: "No files were uploaded." });
        }
        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "Size too large." });
        }
        if (
            file.mimetype !== "image/jpeg" &&
            file.mimetype !== "image/png"
        ) {
            removeTmp(file.tempFilePath);
            return res
                .status(400)
                .json({ msg: "File format is incorrect." });
        }

        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            { folder: "ShoeShop" },
            async (err, result) => {
                if (err) {
                    throw err;
                }
                removeTmp(file.tempFilePath);
                res.json({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        );
    } catch (err) {
        return res.json(err);
    }
})




export { uploadImage };