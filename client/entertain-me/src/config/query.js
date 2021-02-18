import { gql } from '@apollo/client'

export const ENTERTAIN_ME =  gql`
    query {
        movies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
        tvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_BYID = gql`
    query Movie($_id: ID) {
        movie(_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_BYID_SERIES = gql`
    query TvSerie($_id: ID) {
        tvSerie(_id: $_id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_FAV_MOVIE = gql`
    query GetFavMovie {
        collectionFavMovie @client
    }
`
