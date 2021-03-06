import React, { useState } from 'react'

import LoginForm from '../../components/auth/login-form'
import RegisterForm from '../../components/auth/register-form'

import './_index.scss'

function AuthPage () {
  const [mode, setMode] = useState('login')

  return (
    <div className="page -auth flex column center">
      <div>
        <h1>
          {mode === 'register'
            ? <span>Sign up</span>
            : <span>Sign in</span> }
        </h1>

        <div className="container -narrow">
          {mode === 'register'
            ? <RegisterForm onLoginShow={() => setMode('login')} />
            : <LoginForm onRegisterShow={() => setMode('register')} /> }
        </div>

        <div className="demo-accounts inline-flex column">
          <div>Demo accounts:</div>
          <div className="items flex">
            <div>
              <div>username: <strong>asd</strong></div>
              <div>password: <strong>asd</strong></div>
            </div>
            <div>
              <div>username: <strong>asd2</strong></div>
              <div>password: <strong>asd2</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
