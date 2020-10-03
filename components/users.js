import React, { useState, useEffect } from 'react'

const Users = ({ usersList }) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(usersList)
  })

  return (
    <div>
      <p className="lead">
        Bienvenue dans la plateforme Linkinoukh. Premier réseau social
        professionnel pour les figuiguiens et figuiguiennes.
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Prénom</th>
            <th scope="col">Nom</th>
            <th scope="col">Fonction</th>
            <th scope="col">Contact</th>
          </tr>
        </thead>
        <tbody>
          {data != null &&
            data.map((x) => (
              <tr key={x._id} scope="row">
                <td>{x.firstname}</td>
                <td>{x.lastname}</td>
                <td>{x.function}</td>
                <td>
                  <a
                    href={`mailto:${x.email}`}
                    className="btn btn-info"
                    role="button"
                    title={x.email}
                  >
                    contact
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
