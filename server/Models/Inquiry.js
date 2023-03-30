import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        // default:
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true    
    }
}, { timestamps: true });

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry;