import { buildSchema } from "graphql";

import userSchema from "./user/schema.js";
import { userQuery, userMutation } from "./user/resolvers.js";

const schema = buildSchema(userSchema);
const resolvers = { Query: {...userQuery}, Mutation: {...userMutation} };

export { schema, resolvers };