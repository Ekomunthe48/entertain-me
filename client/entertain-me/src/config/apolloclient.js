import { ApolloClient, InMemoryCache } from '@apollo/client'
import { collectionFavMovieVar } from './cache'

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    collectionFavMovie: {
                        read() {
                            return collectionFavMovieVar()
                        }
                    }
                }
            }
        }
    })
})

export default client