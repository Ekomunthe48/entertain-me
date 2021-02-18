const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
    modules: [
        require('./modules/movies'),
        require('./modules/series')
    ]
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
