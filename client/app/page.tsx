'use client'

import { gql, useQuery } from '@apollo/client'
import styles from './page.module.css'

const GET_RESTAURANT = gql`
  query Login {
    me {
      ok
      error
      data {
        email
      }
    }
  }
`

export default function Home() {
  const getRestaurant = useQuery(GET_RESTAURANT)

  if (getRestaurant.loading) {
    return <div>loading...</div>
  }
  if (getRestaurant.error) {
    return <div>error</div>
  }
  return <div className={styles.container}></div>
}
