import express from "express"
import { createServer } from "http";
import helmet from 'helmet'
import { createHandler } from "graphql-http/lib/use/express"
import { buildSchema } from "graphql"
import mongoose from 'mongoose'

const app = express()
const port = process.env.PORT || 8080;
const httpServer = createServer(app);
await mongoose.connect("mongodb://localhost:27017/myapp").catch(err => console.error(err));
export { mongoose }

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello() {
        return "Hello world!"
    },
}

import User from "./models/user.js"
const foundUser = await User.find({name: "user1"});

console.log(foundUser[0]);

if(!foundUser[0]) {
    const user = new User({name: "user1"});
    await user.save().then(() => console.log("saved")); 
}

app.use(express.json({limit: '20kb'}));
app.use(helmet());
app.disable('x-powered-by');


app.get('*', (_req, res) => {
    res.sendStatus(200);
});

app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
    })
);

httpServer.listen(port, () => console.log(`running on http://localhost:${port}`));