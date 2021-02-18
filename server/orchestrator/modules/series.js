const { gql } = require('apollo-server')
const Axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

const typeDefs = gql`
    type TvSeries {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        tvSeries: [TvSeries]
        tvSerie(_id: ID): TvSeries
    }

    input TvSeriesInput {
        title: String!
        overview: String!
        poster_path: String!
        popularity: Float!
        tags: [String]
    }

    extend type Mutation {
        addTvSeries(data: TvSeriesInput): TvSeries
        editTvSeries(_id: ID, data: TvSeriesInput): TvSeries
        deleteTvSeries(_id: ID): TvSeries
    }
`

const resolvers = {
    Query: {
        tvSeries: async () => {
            const cacheTvSeries = await redis.get("tvSeries:data")
            if (cacheTvSeries) {
                console.log('From Redis');
                return (JSON.parse(cacheTvSeries));
            } else {
                console.log('From Axios');
                try {
                    const tvSeries = await Axios.get('http://localhost:4002/tv')
                    redis.set("tvSeries:data", JSON.stringify(tvSeries.data))
                    return (tvSeries.data);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        tvSerie: async (parent, args, context, info) => {
            let id = args._id
            try {
                const tvSerie = await Axios.get(`http://localhost:4002/tv/${id}`)
                return(tvSerie.data);
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        addTvSeries: async (parent, args, context, info) => {
            const payload = args.data
            try {
                const newTvSeries = await Axios.post('http://localhost:4002/tv/add', payload)
                if (newTvSeries) {
                    await redis.del("tvSeries:data")
                    return(newTvSeries.data.ops[0]);
                } else {
                    throw new Error("Failed")
                }
            } catch (error) {
                console.log(error);
            }
        },
        editTvSeries: async (parent, args, context, info) => {
            let id = args._id
            let payload = args.data
            try {
                const { data } = await Axios.get(`http://localhost:4002/tv/${id}`)
                if (data) {
                    const updatedTvSeries = await Axios.patch(`http://localhost:4002/tv/edit/${id}`, payload)
                    if (updatedTvSeries) {
                        await redis.del("tvSeries:data")
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
        deleteTvSeries: async (parent, args, context, info) => {
            let id = args._id
            let deletedData
            try {
                const { data } = await Axios.get(`http://localhost:4002/tv/${id}`)
                deletedData = data
                if (data) {
                    const response = Axios.delete(`http://localhost:4002/tv/delete/${id}`)
                    if(response) {
                        await redis.del("tvSeries:data")
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
