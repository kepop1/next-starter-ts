import { useRouter } from 'next/router'
import { ROUTE_LOGIN, ROUTE_REGISTER } from '../lib/helpers/route-constants'
import { Button, TextButton } from '../lib'
import styles from '../styles/Welcome.module.scss'

const Welcome = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Next.JS Starter App</h1>
      <p className={styles.text}>
        This app will give you some different things out the box. It might seem
        a little barebones or OTT but give it a while and even make it your own!
      </p>

      <Button onClick={() => router.push(ROUTE_REGISTER)} label="Register" />
      <TextButton
        onClick={() => router.push(ROUTE_LOGIN)}
        label="Already have an account? Login!"
      />
    </div>
  )
}

export default Welcome
