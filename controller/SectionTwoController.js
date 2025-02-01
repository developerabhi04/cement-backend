import multer from 'multer';
import cloudinary from 'cloudinary';
import SectionTwo from '../model/SectionTwoModel.js';


// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create
export const addSectionTwo = [upload.fields([{ name: 'cardUrl', maxCount: 1 }]), async (req, res) => {
    try {
        const { hOne, hTwo, content } = req.body;

        // Helper function to upload files to Cloudinary
        const uploadFileToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream({ folder: 'sections' }, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }).end(fileBuffer);
            });
        };

        // Handle file uploads to Cloudinary
        const cardUrl = req.files?.cardUrl ? await uploadFileToCloudinary(req.files.cardUrl[0].buffer) : '';

        // Create a new application instance
        const newSection = new SectionTwo({ hOne, hTwo, content, cardUrl });

        // Save the new application to the database
        await newSection.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'SectionTwo Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}];



// Get all
export const getAllSectionTwo = async (req, res) => {
    try {
        const sectionTwos = await SectionTwo.find();
        res.status(200).json({
            success: true,
            sectionTwos,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update
export const updateSectionTwo = [upload.single("cardUrl"), async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { hOne, hTwo, content } = req.body; // Extract name from request body

        // Find the Banner by ID
        const sectionTwo = await SectionTwo.findById(id);
        if (!sectionTwo) {
            return res.status(404).json({
                success: false,
                message: "SectionTwo Field not found",
            });
        }

        // Check if a new image file is uploaded
        if (req.file) {
            // Extract public_id from the current image URL (assuming Cloudinary URL format)
            const currentSectionTwoUrl = sectionTwo.cardUrl;
            const publicIdMatch = currentSectionTwoUrl.match(/\/([^/]+)\.[a-z]+$/i);
            if (publicIdMatch) {
                const publicId = `sections/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

                // Delete the old image from Cloudinary
                await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                    if (error) console.error("Failed to delete old image:", error);
                });
            }

            // Upload the new image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                cloudinary.v2.uploader.upload_stream(
                    { folder: "sections" }, // Cloudinary folder name
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(req.file.buffer); // Upload file buffer to Cloudinary
            });

            // Update the logo's image URL
            sectionTwo.cardUrl = result.secure_url;
        }

        // Update logo name if provided
        if (hOne, hTwo, content) {
            sectionTwo.hOne = hOne;
            sectionTwo.hTwo = hTwo;
            sectionTwo.content = content;
        }

        // Save the updated logo
        await sectionTwo.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            sectionTwo,
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




// Delete
export const deleteSectionTwo = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const sectionTwo = await SectionTwo.findById(id);
        if (!sectionTwo) {
            return res.status(404).json({
                success: false,
                message: "SectionTwo and Content not found",
            });
        }

        // Extract public_id from the current image URL (assuming Cloudinary URL format)
        const currentSectionTwoUrl = sectionTwo.cardUrl;

        const publicIdMatch = currentSectionTwoUrl.match(/\/([^/]+)\.[a-z]+$/i);
        if (publicIdMatch) {
            const publicId = `sections/${publicIdMatch[1]}`; // Assuming "logo" is the folder name in Cloudinary

            // Delete the old image from Cloudinary
            await cloudinary.v2.uploader.destroy(publicId, (error, result) => {
                if (error) {
                    console.error("Failed to delete image from Cloudinary:", error);
                } else {
                    console.log("Section and Content deleted from Cloudinary:", result);
                }
            });
        }

        // Remove the logo from the database
        await sectionTwo.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "SectionTwo Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

