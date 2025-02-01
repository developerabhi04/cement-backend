import multer from 'multer';
import cloudinary from 'cloudinary';
import SectionThree from '../model/SectionThreeModel.js';



// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create
export const addSectionThree = [upload.fields([{ name: 'cardUrl', maxCount: 1 }]), async (req, res) => {
    try {
        const { hOne, hTwo, contentOne, contentTwo, contentThree, contentFour, QuestionOne, AnswerOne, QuestionTwo, AnswerTwo, QuestionThree, AnswerThree } = req.body;

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
        const newSection = new SectionThree({ hOne, hTwo, contentOne, contentTwo, contentThree, contentFour,  cardUrl, QuestionOne, AnswerOne, QuestionTwo, AnswerTwo, QuestionThree, AnswerThree });

        // Save the new application to the database
        await newSection.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'SectionThree Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}];



// Get all
export const getAllSectionThree = async (req, res) => {
    try {
        const sectionThree = await SectionThree.find();
        res.status(200).json({
            success: true,
            sectionThree,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update
export const updateSectionThree = [upload.single("cardUrl"), async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { hOne, hTwo, contentOne, contentTwo, contentThree, contentFour, QuestionOne, AnswerOne, QuestionTwo, AnswerTwo, QuestionThree, AnswerThree } = req.body; // Extract name from request body

        // Find the Banner by ID
        const sectionThree = await SectionThree.findById(id);
        if (!sectionThree) {
            return res.status(404).json({
                success: false,
                message: "SectionThree Field not found",
            });
        }

        // Check if a new image file is uploaded
        if (req.file) {
            // Extract public_id from the current image URL (assuming Cloudinary URL format)
            const currentSectionThreeUrl = sectionThree.cardUrl;
            const publicIdMatch = currentSectionThreeUrl.match(/\/([^/]+)\.[a-z]+$/i);
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
            sectionThree.cardUrl = result.secure_url;
        }

        // Update logo name if provided
        if (hOne, hTwo, contentOne, contentTwo, contentThree, contentFour, QuestionOne, AnswerOne, QuestionTwo, AnswerTwo, QuestionThree, AnswerThree) {
            sectionThree.hOne = hOne;
            sectionThree.hTwo = hTwo;
            sectionThree.contentOne = contentOne;
            sectionThree.contentTwo = contentTwo;
            sectionThree.contentThree = contentThree;
            sectionThree.contentFour = contentFour;
            sectionThree.QuestionOne = QuestionOne;
            sectionThree.AnswerOne = AnswerOne;
            sectionThree.QuestionTwo = QuestionTwo;
            sectionThree.AnswerTwo = AnswerTwo;
            sectionThree.QuestionThree = QuestionThree;
            sectionThree.AnswerThree = AnswerThree;
        }

        // Save the updated logo
        await sectionThree.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            sectionThree,
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
export const deleteSectionThree = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const sectionThree = await SectionThree.findById(id);
        if (!sectionThree) {
            return res.status(404).json({
                success: false,
                message: "SectionThree and Content not found",
            });
        }

        // Extract public_id from the current image URL (assuming Cloudinary URL format)
        const currentSectionThreeUrl = sectionThree.cardUrl;
        const publicIdMatch = currentSectionThreeUrl.match(/\/([^/]+)\.[a-z]+$/i);
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
        await sectionThree.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "SectionThree Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

