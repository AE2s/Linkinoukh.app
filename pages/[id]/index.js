import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'

const User = ({ user }) => {
  const [confirm, setConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isDeleting) {
      deleteUser()
    }
  }, [isDeleting])

  const open = () => setConfirm(true)

  const close = () => setConfirm(false)

  const deleteUser = async () => {
    const userId = router.query.id
    try {
      const deleted = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'Delete',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    close()
  }

  return (
    <div className="user-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{user.firstname}</h1>
          <p>
            {user.lastname}
            <br />
            {user.email}
            <br />
            {user.function}
            <br />
            {user.tel}
            <br />
            {user.birthdate}
          </p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  )
}

User.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`)
  const { data } = await res.json()

  return { user: data }
}

export default User
