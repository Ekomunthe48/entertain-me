import { gql } from '@apollo/client'

export const UPDATE_MOVIES = gql`
    mutation ($_id: ID, $updatedMovie: MovieInput){
        editMovie(_id: $_id, data: $updatedMovie) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const UPDATE_SERIES = gql`
    mutation ($_id: ID, $updatedSerie: TvSeriesInput){
        editTvSeries(_id: $_id, data: $updatedSerie) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`