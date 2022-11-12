'use client'

import { gql, makeVar, useReactiveVar } from '@apollo/client'
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

const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`

const isLoggedInVar = makeVar(false)

export default function Home() {
  const isLoggedIn = useReactiveVar(isLoggedInVar)

  return (
    <div className={styles.container}>
      {!isLoggedIn ? (
        <p onClick={() => isLoggedInVar(true)}>log in</p>
      ) : (
        <p onClick={() => isLoggedInVar(false)}>log out</p>
      )}
    </div>
  )
}
