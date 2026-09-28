import mongoose from "mongoose"

const ImageSchema = new mongoose.Schema(
    {
        title:{
           type: String,
        },
        description:{
            type: String,
        },
        image:{
            type: String,
            required:true
        }
    }
);
const Image = mongoose.model("Image", ImageSchema);

export default Image;