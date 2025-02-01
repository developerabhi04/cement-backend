import SectionSix from '../model/SectionSixModel.js'



// Create
export const addSectionSix = async (req, res) => {
    try {
        const { hOne, hTwo, hThree } = req.body;

        // Create a new application instance
        const newSection = new SectionSix({ hOne, hTwo, hThree });

        // Save the new application to the database
        await newSection.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'SectionSix Content Created Successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}


// Get all
export const getAllSectionSix = async (req, res) => {
    try {
        const sectionSixs = await SectionSix.find();
        res.status(200).json({
            success: true,
            sectionSixs,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};


// Update
export const updateSectionSix = async (req, res) => {
    try {
        const { id } = req.params; // Extract Banner ID from URL
        const { hOne, hTwo, hThree } = req.body; // Extract name from request body

        // Find the Banner by ID
        const sectionSix = await SectionSix.findById(id);
        if (!sectionSix) {
            return res.status(404).json({
                success: false,
                message: "SectionSix Field not found",
            });
        }


        // Update logo name if provided
        if (hOne, hTwo, hThree) {
            sectionSix.hOne = hOne;
            sectionSix.hTwo = hTwo;
            sectionSix.hThree = hThree;
        }

        // Save the updated logo
        await sectionSix.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Updated successfully!",
            sectionSix,
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
export const deleteSectionSix = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const sectionSix = await SectionSix.findById(id);
        if (!sectionSix) {
            return res.status(404).json({
                success: false,
                message: "SectionSix and Content not found",
            });
        }



        // Remove the logo from the database
        await sectionSix.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "SectionSix Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

