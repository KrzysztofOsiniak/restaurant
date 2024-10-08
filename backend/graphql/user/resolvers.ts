import User from "../../models/user.js";

const userResolvers = {
    async hello(args: any, context: any) {
        console.log("Called graphql");
        console.log(context);
        const foundUser = await User.find({name: "user1"});

        if(!foundUser[0]) {
            const user = new User({name: "user1"});
            await user.save().then(() => console.log("saved")); 
            return user.name;
        }

        return foundUser[0].name;
    },
};

export default userResolvers;