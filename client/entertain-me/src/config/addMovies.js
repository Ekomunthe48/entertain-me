import { gql } from '@apollo/client'

export const ADD_MOVIES = gql`
    mutation ($newMovie: MovieInput){
        addMovie(data: $newMovie) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`
export const ADD_SERIES = gql`
    mutation ($newSerie: TvSeriesInput){
        addTvSeries(data: $newSerie) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`