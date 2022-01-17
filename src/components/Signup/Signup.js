import React, { useContext, useEffect, useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { FaGoogle } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { MoviesContext } from '../../contexts/movies-context'
import useMounted from '../../hooks/useMounted.js'
import updateUserDocument from '../../utils/updateUserDocument'
import './Signup.css'

export const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signInWithGoogle, signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()

  const { favorites, movieLists } = useContext(MoviesContext)

  const mounted = useMounted()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Failed to create an account')
    }
    mounted.current && setLoading(false)
  }

  useEffect(() => {
    // console.log('Add document on not null: ', currentUser)
    if (currentUser != null) {
      updateUserDocument(currentUser, favorites, movieLists)
    }
  }, [currentUser])

  return (
    <Container
      className="d-flex align-items-center justify-content-center text-align"
      style={{ minHieght: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="display-4 display-margin">Sign Up</h1>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group className="mb-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Form.Group className="mb-3" id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>

              <Button
                disabled={loading}
                className="w-100  mb-2"
                variant="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </Form>
            <div className="w-100 text-center mt-2 strike">
              <span>OR</span>
            </div>
            <Button
              variant="outline-danger"
              className="w-100 mt-3 mb-2"
              onClick={() =>
                signInWithGoogle()
                  .then(() => history.push('/dashboard'))
                  .catch((e) => console.log(e.message))
              }
            >
              <FaGoogle className="google-icon" />
              Sign up with Google
            </Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2 no-underline">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  )
}
