import { gql } from '@apollo/client'

export const DELETE_MOVIES = gql`
    mutation DeleteMovie($_id: ID){
        deleteMovie (_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const DELETE_SERIES = gql`
    mutation DeleteSerie($_id: ID){
        deleteTvSeries (_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`