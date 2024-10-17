import User from "../../models/user.js";

const userQuery = {
    async login(parent: any, args: any, context: any) {
        console.log("Called graphql");
        console.log(args);
        const foundUser = await User.find({name: "user1"});

        if(!foundUser[0]) {
            const user = new User({name: "user1"});
            await user.save().then(() => console.log("saved")); 
            return user.name;
        }

        return foundUser[0].name;
    }
};

const userMutation = {
    async signup(parent: any, args: any, context: any) {
        console.log("Called graphql");
        console.log(args);
        const foundUser = await User.find({name: "user1"});

        if(!foundUser[0]) {
            const user = new User({name: "user1"});
            await user.save().then(() => console.log("saved")); 
            return user.name;
        }

        return foundUser[0].name;
    },
};

export { userQuery, userMutation };