const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers')
// The GraphQL schema
const typeDefs = require('./typeDefs')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});