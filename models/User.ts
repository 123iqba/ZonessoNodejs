const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id)
  },
  Mutation: {
    addUser: (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      return newUser.save();
    }
  }
};