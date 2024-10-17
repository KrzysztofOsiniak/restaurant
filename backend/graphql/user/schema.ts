const userSchema = `#graphql
    type Query {
        login(username: String, password: String): String
    },
    type Mutation {
        signup(username: String, password: String): String
    }
`;

export default userSchema