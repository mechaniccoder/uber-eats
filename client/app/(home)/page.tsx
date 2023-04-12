'use client'

import { GetRestaurantsQuery, GetRestaurantsQueryVariables } from '@/gql/graphql'
import { GET_RESTAURANTS } from '@/restaurant/gql'
import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'

export default function Home() {
  const { loading, error, data } = useQuery<GetRestaurantsQuery, GetRestaurantsQueryVariables>(
    GET_RESTAURANTS,
    {
      variables: {
        input: {},
      },
    },
  )

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <div>Error</div>
  }
  return <div>This is a home page</div>
}
