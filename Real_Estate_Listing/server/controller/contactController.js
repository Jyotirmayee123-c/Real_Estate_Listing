const Contact = require("../model/Contact");

exports.createContact = async (req, res) => {
    try {
        const { fullName, email, phone, whatsApp, lookingTo, propertyType, bestTimeToContact, preferredContactMethod, description } = req.body;
        const contact = new Contact({
            fullName,
            email,
            phone,
            whatsApp,
            lookingTo,
            propertyType,
            bestTimeToContact,
            preferredContactMethod,
            description,
        });
        await contact.save();
        res.status(201).json({ success: true, message: "Contact request saved" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.getContact = async (req, res) => {
    try {

        const contacts = await Contact.find()
        res.json({
            success: true,
            data: contacts
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.json({ success: true, message: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}