import multer from 'multer';
import cloudinary from 'cloudinary';
import Banner from "../model/bannerModel.js";


// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 
// Controller for adding logo
export const addBanner = [upload.fields([{ name: 'bannerUrl', maxCount: 1 }]), async (req, res) => {
    try {
        const { headingOne, headingTwo, paragraph } = req.body;

        // Helper function to upload files to Cloudinary
        const uploadFileToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({ folder: 'banner' }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }).end(fileBuffer);
            });
        };

        // Handle file uploads to Cloudinary
        const bannerUrl = req.files?.bannerUrl ? await uploadFileToCloudinary(req.files.bannerUrl[0].buffer) : '';

        // Create a new application instance
        const newBanner = new Banner({ headingOne, headingTwo, paragraph, bannerUrl });

        // Save the new application to the database
        await newBanner.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'Banner and Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}];



// Get all logos
export const getAllBanner = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            success: true,
            banners,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update a logo
export const updateBanner = [upload.single("bannerUrl"), async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { headingOne, headingTwo, paragraph } = req.body; // Extract name from request body

        // Find the Banner by ID
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found",
            });
        }

        // Check if a new image file is uploaded
        if (req.file) {
            // Extract public_id from the current image URL (assuming Cloudinary URL format)
            const currentBannerUrl = banner.bannerUrl;
            const publicIdMatch = currentBannerUrl.match(/\/([^/]+)\.[a-z]+$/i);
            if (publicIdMatch) {
                const publicId = `banner/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

                // Delete the old image from Cloudinary
                await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                    if (error) console.error("Failed to delete old image:", error);
                });
            }

            // Upload the new image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(
                    { folder: "banner" }, // Cloudinary folder name
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer); // Upload file buffer to Cloudinary
            });

            // Update the logo's image URL
            banner.bannerUrl = result.secure_url;
        }

        // Update logo name if provided
        if (headingOne, headingTwo, paragraph) {
            banner.headingOne = headingOne;
            banner.headingTwo = headingTwo;
            banner.paragraph = paragraph;
        }

        // Save the updated logo
        await banner.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Banner updated successfully!",
            banner,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
},
];




// Delete a banner
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner and Content not found",
            });
        }

        // Extract public_id from the current image URL (assuming Cloudinary URL format)
        const currentBannerUrl = banner.bannerUrl;
        const publicIdMatch = currentBannerUrl.match(/\/([^/]+)\.[a-z]+$/i);
        if (publicIdMatch) {
            const publicId = `banner/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

            // Delete the old image from Cloudinary
            await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Failed to delete image from Cloudinary:", error);
                } else {
                    console.log("Banner and Content deleted from Cloudinary:", result);
                }
            });
        }

        // Remove the logo from the database
        await banner.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "Banner and Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

