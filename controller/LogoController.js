import Logo from "../model/LogoModel.js";
import multer from 'multer';
import cloudinary from 'cloudinary';


// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 
// Controller for adding logo
export const addLogo = [upload.fields([{ name: 'imageUrl', maxCount: 1 }]), async (req, res) => {
    try {
        const { name } = req.body;

        // Helper function to upload files to Cloudinary
        const uploadFileToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({ folder: 'logo' }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }).end(fileBuffer);
            });
        };

        // Handle file uploads to Cloudinary
        const imageUrl = req.files?.imageUrl ? await uploadFileToCloudinary(req.files.imageUrl[0].buffer) : '';

        // Create a new application instance
        const newLogo = new Logo({ name, imageUrl });

        // Save the new application to the database
        await newLogo.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'Logo created successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}];



// Get all logos
export const getAllLogos = async (req, res) => {
    try {
        const logos = await Logo.find();
        res.status(200).json({
            success: true,
            logos,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update a logo
export const updateLogo = [upload.single("imageUrl"), async (req, res) => {
    try {
        const { id } = req.params; // Extract logo ID from URL
        const { name } = req.body; // Extract name from request body

        // Find the logo by ID
        const logo = await Logo.findById(id);
        if (!logo) {
            return res.status(404).json({
                success: false,
                message: "Logo not found",
            });
        }

        // Check if a new image file is uploaded
        if (req.file) {
            // Extract public_id from the current image URL (assuming Cloudinary URL format)
            const currentImageUrl = logo.imageUrl;
            const publicIdMatch = currentImageUrl.match(/\/([^/]+)\.[a-z]+$/i);
            if (publicIdMatch) {
                const publicId = `logo/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

                // Delete the old image from Cloudinary
                await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                    if (error) console.error("Failed to delete old image:", error);
                });
            }

            // Upload the new image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(
                    { folder: "logo" }, // Cloudinary folder name
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer); // Upload file buffer to Cloudinary
            });

            // Update the logo's image URL
            logo.imageUrl = result.secure_url;
        }

        // Update logo name if provided
        if (name) {
            logo.name = name;
        }

        // Save the updated logo
        await logo.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Logo updated successfully!",
            logo,
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




// Delete a logo
export const deleteLogo = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const logo = await Logo.findById(id);
        if (!logo) {
            return res.status(404).json({
                success: false,
                message: "Logo not found",
            });
        }

        // Extract public_id from the current image URL (assuming Cloudinary URL format)
        const currentImageUrl = logo.imageUrl;
        const publicIdMatch = currentImageUrl.match(/\/([^/]+)\.[a-z]+$/i);
        if (publicIdMatch) {
            const publicId = `logo/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

            // Delete the old image from Cloudinary
            await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Failed to delete image from Cloudinary:", error);
                } else {
                    console.log("Image deleted from Cloudinary:", result);
                }
            });
        }

        // Remove the logo from the database
        await logo.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "Logo deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

