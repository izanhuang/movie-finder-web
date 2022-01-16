import React, { useRef, useState, useEffect, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import useMounted from '../hooks/useMounted.js'
import { FaGoogle } from 'react-icons/fa'
import loadUserDocument from '../utils/loadUserDocument'
import { MoviesContext } from '../contexts/movies-context'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signInWithGoogle, login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  let history = useHistory()

  const { setFavorites, setMovieLists } = useContext(MoviesContext)

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

  useEffect(() => {
    console.log('Load on login on not null: ', currentUser)
    if (currentUser != null) {
      loadUserDocument(currentUser, setFavorites, setMovieLists)
    }
  }, [currentUser])

  return (
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
  )
}
