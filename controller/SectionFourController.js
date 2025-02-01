import SectionFour from '../model/SectionFourModel.js';


// Create
export const addSectionFour = async (req, res) => {
    try {
        const { hOne, hTwo, hThree, content } = req.body;

        // Create a new application instance
        const newSection = new SectionFour({ hOne, hTwo, hThree, content });

        // Save the new application to the database
        await newSection.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'SectionFour Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}



// Get all
export const getAllSectionFour = async (req, res) => {
    try {
        const SectionFours = await SectionFour.find();
        res.status(200).json({
            success: true,
            SectionFours,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update
export const updateSectionFour = async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { hOne, hTwo, hThree, content } = req.body; // Extract name from request body


        // Find the Banner by ID
        const sectionFour = await SectionFour.findById(id);
        if (!sectionFour) {
            return res.status(404).json({
                success: false,
                message: "SectionFour Field not found",
            });
        }



        // Update logo name if provided
        if (hOne, hTwo, hThree, content) {
            sectionFour.hOne = hOne;
            sectionFour.hTwo = hTwo;
            sectionFour.hThree = hThree;
            sectionFour.content = content;
        }

        // Save the updated logo
        await sectionFour.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            sectionFour,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
}




// Delete
export const deleteSectionFour = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const sectionFour = await SectionFour.findById(id);

        if (!sectionFour) {
            return res.status(404).json({
                success: false,
                message: "SectionFour and Content not found",
            });
        }

        // Remove the logo from the database
        await sectionFour.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "SectionFour Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

