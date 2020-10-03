import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card} from 'semantic-ui-react';

const Index = ({users}) => {
  return (
    <div className="user-container">
      <h1>Linkinoukh</h1>
      <div className="grid wrapper">
          {users.map(user => {
            return (
                <div key={user._id}>
                    <Card>
                        <Card.Content>
                            <Card.Header>
                              <Link href={`/${user._id}`}>
            <a>{user.firstname}</a>
                              </Link>
                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                        <Link href={`/${user._id}`}>
                          <Button primary>View</Button>
                          </Link>
                          <Link href={`/${user._id}/editUser`}>
                          <Button primary>Edit</Button>
                          </Link>
                        </Card.Content>
                    </Card>
                  </div>
            )
          })}
      </div>
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const { data} = await res.json();

  return { users : data};
}

export default Index;