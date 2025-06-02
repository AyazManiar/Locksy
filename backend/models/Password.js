import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  site: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Password", passwordSchema);