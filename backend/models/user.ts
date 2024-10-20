import { mongoose } from "../index.js"

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("users", userSchema);

export default User
