import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function CustomToastContainer({ autoClose }) {
  return (
    <ToastContainer
      position="bottom-center"
      pauseOnFocusLoss={false}
      autoClose={autoClose}
      limit={3}
      className="smaller-font"
    />
  )
}
