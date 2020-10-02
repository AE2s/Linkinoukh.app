import fetch from 'isomorphic-unfetch';
import { userState, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Confirm, Button, Loader} from 'semantic-ui-react';
import { route } from 'next/dist/next-server/server/router';

const User = ({user}) => {
    const [confirm,setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {

        if(isDeleting){
            deleteUser();
        }
    }, [isDeleting]);

    const open = () => {
        setConfirm(true);
    }

    const close = () => {
        setConfirm(false);
    }

    const deleteUser = async () => {
        const userId = router.query.id;
        try {
            const deleted= await fetch(`http://localhost:3000/api/users/${userId}`, {
                method : 'Delete'
            });

            router.push("/");

        }
        catch(error){
            log.console(error);
        }
    }

    const handleDelete  = async () => {
        setIsDeleting(true);
        close();

    }

    return (
        <div className="user-container">
            {isDeleting ?
                <Loader active /> :
                <>
                    <h1>{user.lastname} {user.firsname}</h1>
                    <ul>
                        <li>{user.email}</li>
                        <li>{user.function}</li>
                        <li>{user.tel}</li>
                        <li>{user.birthdate}</li>
                    </ul>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }

            <Confirm open={confirm}
            onCancel={close}
            onConfirm={handleDelete}
            />
        </div>
    );
};

User.getInitialProps = async ({query : { id }}) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`);

    const { data } = await res.json();

    return { user : data};

}

export default User;