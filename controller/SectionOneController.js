import multer from 'multer';
import cloudinary from 'cloudinary';
import SectionOne from '../model/SectionOneModel.js';


// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create
export const addSectionOne = [upload.fields([{ name: 'cardUrl', maxCount: 1 }]), async (req, res) => {
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
        const newSection = new SectionOne({ hOne, hTwo, content, cardUrl });

        // Save the new application to the database
        await newSection.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'SectionOne Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}];



// Get all
export const getAllSectionOne = async (req, res) => {
    try {
        const sectionOnes = await SectionOne.find();
        res.status(200).json({
            success: true,
            sectionOnes,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update
export const updateSectionOne = [upload.single("cardUrl"), async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { hOne, hTwo, content } = req.body; // Extract name from request body

        // Find the Banner by ID
        const sectionOne = await SectionOne.findById(id);
        if (!sectionOne) {
            return res.status(404).json({
                success: false,
                message: "SectionOne Field not found",
            });
        }

        // Check if a new image file is uploaded
        if (req.file) {
            // Extract public_id from the current image URL (assuming Cloudinary URL format)
            const currentSectionOneUrl = sectionOne.cardUrl;
            const publicIdMatch = currentSectionOneUrl.match(/\/([^/]+)\.[a-z]+$/i);
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
            sectionOne.cardUrl = result.secure_url;
        }

        // Update logo name if provided
        if (hOne, hTwo, content) {
            sectionOne.hOne = hOne;
            sectionOne.hTwo = hTwo;
            sectionOne.content = content;
        }

        // Save the updated logo
        await sectionOne.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            sectionOne,
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
export const deleteSectionOne = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const sectionOne = await SectionOne.findById(id);
        if (!sectionOne) {
            return res.status(404).json({
                success: false,
                message: "SectionOne and Content not found",
            });
        }

        // Extract public_id from the current image URL (assuming Cloudinary URL format)
        const currentSectionOneUrl = sectionOne.cardUrl;
        const publicIdMatch = currentSectionOneUrl.match(/\/([^/]+)\.[a-z]+$/i);
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
        await sectionOne.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "SectionOne Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

