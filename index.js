const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers')
// The GraphQL schema
const typeDefs = require('./typeDefs')


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});