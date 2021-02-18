const { gql } = require('apollo-server')
const Axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
    type Movie {
        _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    extend type Query {
        movies: [Movie]
        movie(_id: ID): Movie
    }

    input MovieInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]
    }

    extend type Mutation {
        addMovie(data: MovieInput): Movie
        editMovie(_id: ID, data: MovieInput): Movie
        deleteMovie(_id: ID): Movie
    }
`

const resolvers = {
    Query: {
        movies: async () => {
            const cacheMovie = await redis.get("movies:data")
            if (cacheMovie) {
                console.log('From Redis');
                return (JSON.parse(cacheMovie));
            } else {
                console.log('From Axios');
                try {
                    const movies = await Axios.get('http://localhost:4001/movies')
                    redis.set("movies:data", JSON.stringify(movies.data))
                    return(movies.data);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        movie: async (parent, args, context, info) => {
            let id = args._id
            try {
                const movie = await Axios.get(`http://localhost:4001/movies/${id}`)
                return(movie.data);
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        addMovie: async (parent, args, context, info) => {
            const payload = args.data
            try {
                const newMovies = await Axios.post('http://localhost:4001/movies/add', payload)
                if (newMovies) {
                    await redis.del("movies:data")
                    return newMovies.data.ops[0]
                } else {
                    throw new Error("Failed")
                }
            } catch (error) {
                console.log(error)
            }
        },
        editMovie: async (parent, args, context, info) => {
            let id = args._id
            let payload = args.data
            try {
                const { data } = await Axios.get(`http://localhost:4001/movies/${id}`)
                if (data) {
                    const updatedMovie = await Axios.patch(`http://localhost:4001/movies/edit/${id}`, payload)
                    if (updatedMovie) {
                        await redis.del("movies:data")
                        return data
                    } else {
                        throw new Error("Failed")
                    }
                } else {
                    throw "resourceNotFound"
                }
            } catch (error) {
                console.log(error);
            }
        },
        deleteMovie: async (parent, args, context, info) => {
            let id = args._id
            let deletedData
            try {
                const { data } = await Axios.get(`http://localhost:4001/movies/${id}`)
                deletedData = data
                if (data) {
                    const response = Axios.delete(`http://localhost:4001/movies/delete/${id}`)
                    if(response) {
                        await redis.del("movies:data")
                        return deletedData
                    } else {
                        throw ('Failed')
                    }
                } else {
                    throw "resourceNotFound"
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}