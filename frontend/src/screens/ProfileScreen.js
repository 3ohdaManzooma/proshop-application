import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' //this is the import in the head of the file
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../action/userAction'

const ProfileScreen = ({ }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [consfirmPassword, setConsfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogIn);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdate;
    const dispatch = useDispatch()
    useEffect(() => {
        //we want to check if the user is existed or not .
        //if the user is existed then redirect .
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user])
    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== consfirmPassword) {
            setMessage('Password do not match')
        } else {
            //DISPATCH UPDATE PROFILE 
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>Invalid email or passwrod</Message>}
            {success && <Message variant='success'>Updated Successfully</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confrim Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        //value={password}
                        onChange={(e) => { setConsfirmPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>

}
export default ProfileScreen;