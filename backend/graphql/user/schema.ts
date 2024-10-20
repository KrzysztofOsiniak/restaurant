const userSchema = `#graphql
    type Query {
        login(username: String!, password: String!): User
    },
    type Mutation {
        signup(username: String!, password: String!): User
    }
    type User {
        username: String
        password: String
    }
`;

export default userSchema