import React, { useEffect, useState } from 'react'
import { useRouter } from 'react-router5'
import { login as sendLoginRequest } from '../../../store/auth/events'
import { nextTick } from '../../../helpers/next-tick'

import UIInput from '../../ui/input'
import UIButton from '../../ui/button'

import './_index.scss'

interface LoginFormOptions {
  onRegisterShow?: () => void
}

function LoginForm ({ onRegisterShow }: LoginFormOptions) {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const router = useRouter()

  const usernameField = React.createRef()
  const passwordField = React.createRef()
  const [isLoading, setIsLoading] = useState(false)

  const login = async () => {
    setIsLoading(true)
    const successResponse = await sendLoginRequest({
      username: loginUsername,
      password: loginPassword
    }).then(() => true)
      .catch(() => {
        (passwordField.current as any).focus();
        (passwordField.current as any).select()
        setPasswordError('sign_in_failed')
        return false
      })

    setIsLoading(false)

    if (successResponse) {
      await router.navigate('home')
    }
  }

  const validateForm = () => {
    const res = []

    if (!loginUsername.length) {
      res.push({
        field: 'username',
        message: 'required'
      });
      (usernameField.current as any).focus()
      return res
    }
    if (!loginPassword.length) {
      res.push({
        field: 'password',
        message: 'required'
      })
      if (loginUsername.length) {
        (passwordField.current as any).focus()
      }
    }

    return res
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errorsFound = validateForm()

    if (errorsFound.length) {
      errorsFound.forEach(error => {
        switch (error.field) {
          case 'username':
            setUsernameError(error.message)
            break
          case 'password':
            setPasswordError(error.message)
            break
        }
      })
      console.log({
        username: loginUsername,
        password: loginPassword
      })
      return
    }

    login()
  }

  const goToRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (onRegisterShow) {
      onRegisterShow()
    }
  }

  useEffect(() => {
    nextTick(() => {
      (usernameField.current as any).focus()
    })
  }, [])

  return (
    <div className="component -login-form">
      <form onSubmit={onSubmit}>
        <div>
          <UIInput
            ref={usernameField}
            placeholder="username"
            value={loginUsername}
            error={usernameError}
            onInput={() => setUsernameError('')}
            onChange={e => setLoginUsername(e.target.value)}
            onBlur={e => !e.target.value.length ? setUsernameError('') : null } />
        </div>
        <div>
          <UIInput
            ref={passwordField}
            type="password"
            placeholder="password"
            value={loginPassword}
            error={passwordError}
            onInput={() => setPasswordError('')}
            onChange={e => setLoginPassword(e.target.value)}
            onBlur={e => !e.target.value.length ? setPasswordError('') : null } />
        </div>

        <div className="button-block">
          <UIButton type="submit" loading={isLoading} fullWidth={true}>
            Sign in
          </UIButton>
        </div>
        <div>
          <span>or </span>
          <a href="#" onClick={goToRegister}>create_new_account</a>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
