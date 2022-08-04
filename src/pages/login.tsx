import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { Button, TextButton, TextInput } from '../lib'
import { ROUTE_MAIN, ROUTE_REGISTER } from '../lib/helpers/route-constants'
import { useAuth } from '../stores/auth'
import { LOGIN_URL, getRequestHeaders } from '../api/config'
import styles from '../styles/Login.module.scss'

type LoginFormValues = {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { setAuthToken } = useAuth()

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const registeredEmail = router.query.email as string | undefined

  const initialValues = {
    email: registeredEmail || '',
    password: '',
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: initialValues,
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    setLoading(true)

    try {
      const headers = getRequestHeaders()

      const response = await axios.post(
        LOGIN_URL,
        {
          email,
          password,
        },
        { headers: headers },
      )

      if (response.status === 200) {
        // This will trigger te authToken conditional and switch to the AppNavigator.
        setAuthToken(response.data.token)
        router.replace(ROUTE_MAIN)
      }

      return response
    } catch (error: any) {
      if (error?.data?.message) setApiError(`${error?.data.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login</h1>

      <div className={styles.formContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            validate: value => /.+\@.+\..+/.test(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoCapitalize="none"
              type="email"
              autoFocus
            />
          )}
        />
        {!!errors.email && <p className={styles.error}>This is required.</p>}

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              autoCapitalize="none"
              type="password"
            />
          )}
        />
        {!!errors.password && <p className={styles.error}>This is required.</p>}
      </div>

      {!!apiError && <p className={styles.error}>{apiError}</p>}

      {loading ? (
        <div>Loading ...</div>
      ) : (
        <Button onClick={handleSubmit(onSubmit)} label="Login" />
      )}

      <TextButton
        onClick={() => router.push(ROUTE_REGISTER)}
        label="Register"
      />
    </div>
  )
}

export default Login
