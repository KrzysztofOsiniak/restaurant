import { mongoose } from "../index.js"

const userSchema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model("users", userSchema);

export default User
