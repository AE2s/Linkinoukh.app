import Link from 'next/link';
import {useState, useEffect} from 'react';
import fetch from 'isomorphic-unfetch';
import {Button, FeedContent, Form, Loader} from 'semantic-ui-react';
import {useRouter} from 'next/router';

const NewUser = () => {

    const [form, setForm] = useState({
        firstname :'',
        lastname : '',
        function : '',
        email : '',
        tel : '',
        birthdate : ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setErrors] = useState({});
    const router = useRouter();

    const createUser = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users',{
                method : 'POST',
                headers : {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(form)
            })
            router.push("/");
        }
        catch(error){
            console.log(error);
        }

    };

    useEffect( () => {
        if(isSubmitting){
            if(Object.keys(error).length === 0){
                createUser();
            }
            else {
                setIsSubmitting(false);
            }
        }

    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const validate = () => {
        let err = {};
        if(!form.firstname){
            err.firstname = 'first name is required'
        }
        if(!form.lastname){
            err.lastname = 'last name is required'
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Create profile</h1>
            <div>
                {
                    isSubmitting ?
                    <Loader active inline='centered' />
                    :
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            fluid
                            error = {error.firstname ? {content : 'Please enter a first name', pointing : 'below'} : null}
                            label='First name'
                            placeholder='First name'
                            name='firstname'
                            onChange={handleChange}
                        />
                       <Form.Input
                            fluid
                            error ={error.lastname ? {content : 'Please enter a last name', pointing : 'below'} : null}
                            label='Last name'
                            placeholder='Last name'
                            name='lastname'
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            label='Function'
                            placeholder='Function'
                            name='function'
                            onChange={handleChange}
                        />
                        <Form.Input
                            fluid
                            label='tel'
                            placeholder='tel'
                            name='tel'
                            onChange={handleChange}
                        />
                         <Form.Input
                            fluid
                            label='Birth date'
                            placeholder='Birth date'
                            name='birthdate'
                            onChange={handleChange}
                        />
                        <Button type='submit'>Create</Button>

                    </Form>
                }
            </div>
        </div>
    )

}

export default NewUser;