import express from "express";
import { createServer } from "http";
import helmet from 'helmet';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
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
const context = async () => {
    return {token: "passed context"}
};
type myContext = {
    token: string
}

import { schema, resolvers } from "./graphql/index.js";

const server = new ApolloServer<myContext>({
    typeDefs: schema,
    resolvers: resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.all("/graphql", expressMiddleware(server, {
    context: context
}));

httpServer.listen(port, () => console.log(`running on http://localhost:${port}`));