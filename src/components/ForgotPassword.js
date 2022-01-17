import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch (error) {
      console.log(error)
      setError('Failed to reset password')
    }
    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center text-align"
      style={{ minHieght: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h1 className="display-4 display-margin">Password Reset</h1>
        <Card>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Button
                disabled={loading}
                className="w-100"
                variant="primary"
                type="submit"
              >
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup"> Sign Up</Link>
        </div>
      </div>
    </Container>
  )
}
