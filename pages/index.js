import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Button, Card } from 'semantic-ui-react'
import Users from '../components/users'

const Index = ({ users }) => {
  return <Users usersList={users} />
}

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.URL}/api/users`)
  const { data } = await res.json()

  return { users: data }
}

export default Index
