const enquiryModel = require("../model/enquiryModel");

exports.createEnquiry = async (req, res) => {
    try {
        const enquiry = await enquiryModel.create(req.body);
        res.status(201).json({ success: true, enquiry });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getAllEnquiries = async (req, res) => {
    try {

        const enquiries = await enquiryModel
            .find()
            .populate("property") 
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: enquiries
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await enquiryModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, msg: "Enquiry not found" });
        }

        res.status(200).json({ success: true, msg: "Enquiry deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
