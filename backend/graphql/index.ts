import { buildSchema } from "graphql";

import userSchema from "./user/schema.js";
import userResolvers from "./user/resolvers.js";

const schema = buildSchema(userSchema);
const resolvers = { ...userResolvers };

export { schema, resolvers };