import { gql } from '@/gql'

export const GET_RESTAURANTS = gql(`
  query GetRestaurants($input: RestaurantsDto!) {
    restaurants(restaurantsArgs: $input) {
      ok
      error
      data {
        id
        name
        img
        address
        category {
            id
            name
            slug
            restaurantsCount
        }
        owner {
            id
            email
        }
        dishes {
            name
            price
            options
        }
        isPromoted
      }
    }
  }
`)
