import express from "express";
import { createServer } from "http";
import helmet from 'helmet';
import { createHandler } from "graphql-http/lib/use/express";
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 8080;
const httpServer = createServer(app);
await mongoose.connect("mongodb://localhost:27017/myapp").catch(err => console.error(err));
export { mongoose };

app.use(express.json({limit: '20kb'}));
app.use(helmet());
app.disable('x-powered-by');

app.get('*', (_req, res) => {
    res.sendStatus(200);
});

import type { Request } from 'express';
const context = (req: Request) => {
    return "passed context"
};

import { schema, resolvers } from "./graphql/index.js";

app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: resolvers,
        // @ts-ignore: lack of type documentation
        context: context,
    })
);

httpServer.listen(port, () => console.log(`running on http://localhost:${port}`));