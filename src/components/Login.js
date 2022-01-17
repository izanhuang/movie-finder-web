import React, { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { FaGoogle } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted.js'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signInWithGoogle, login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()

  const mounted = useMounted()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
      setError('Failed to log in')
    }
    mounted.current && setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center text-align"
      style={{ minHieght: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="display-4 display-margin">Log In</h1>
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

              <Button
                disabled={loading}
                className="w-100"
                variant="primary"
                type="submit"
              >
                Log In
              </Button>
            </Form>
            <div className="w-100  mt-2 no-underline">
              <Link to="/forgot-password" className="text-muted muted-link">
                Forgot Password?
              </Link>
            </div>
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
          Need an account? <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}
