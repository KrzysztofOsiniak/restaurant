import User from "../../models/user.js";

const userQuery = {
    async login(parent: any, args: any, context: any) {
        console.log("Called graphql");
        console.log(args);
        const foundUser = await User.findOne({username: "user1", password: "123"});

        if(!foundUser) {
            return null;
        }

        return {username: foundUser.username, password: foundUser.password};
    }
};

const userMutation = {
    async signup(parent: any, args: any, context: any) {
        console.log("Called graphql");
        console.log(args);
        const foundUser = await User.findOne({username: "user1", password: "123"});

        if(!foundUser) {
            const user = new User({username: "user1", password: "123"});
            await user.save().then(() => console.log("saved")); 
            return {username: user.username, password: user.password};
        }

        return null;
    },
};

export { userQuery, userMutation };