import React, { useRef, useState } from 'react'
import './Signup.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import useMounted from '../../hooks/useMounted.js'
import { FaGoogle } from 'react-icons/fa'

export const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signInWithGoogle, signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()

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
      history.push('/login')
    } catch (error) {
      console.log(error)
      setError('Failed to create an account')
    }
    mounted.current && setLoading(false)
  }

  return (
    <div className="w-100" style={{ maxWidth: '400px' }}>
      <h1 className="display-4 display-margin">Sign Up</h1>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
              {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group className="mb-3" id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
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
            Sign in with Google
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 no-underline">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
