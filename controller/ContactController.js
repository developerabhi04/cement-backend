import Contact from "../model/ContactModel.js";


// Controller for adding logo
export const addContactInformation = async (req, res) => {
    try {
        const { address, phoneNumber } = req.body;


        const newContact = new Contact({ address, phoneNumber });

        // Save the new application to the database
        await newContact.save();

        // Respond with a success message
        res.status(201).json({
            success: true,
            message: 'Information saved!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};



// Get all logos
export const getAllInformation = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({
            success: true,
            contacts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};



// Update information
export const updateInformation = async (req, res) => {
    try {
        const { id } = req.params; // Extract contact ID from URL
        const { address, phoneNumber } = req.body; // Extract updated fields from request body


        // Find the contact by ID
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Information not found",
            });
        }

        // Update fields if provided in the request body
        if (address) contact.address = address;
        if (phoneNumber) contact.phoneNumber = phoneNumber;

        // Save the updated contact
        await contact.save();

        // Respond with success message
        res.status(200).json({
            success: true,
            message: "Information updated successfully!",
            contact,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};





// Delete a information
export const deleteInformation = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the logo by ID
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Information not found",
            });
        }

       

        // Remove the information from the database
        await contact.deleteOne();

        // Respond with a success message
        res.status(200).json({
            success: true,
            message: "Information deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

