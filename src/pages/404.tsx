import { useEffect } from 'react'
import { ROUTE_MAIN } from '../lib/helpers/route-constants'
import { useRouter } from 'next/router'
import styles from '../styles/404.module.scss'

export default () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push(ROUTE_MAIN)
    }, 4000)
  }, [router])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Oops, this page can&quot;t be found</h1>
      <p className={styles.body}>
        We&quot;ll redirect you back to the main page...
      </p>
    </div>
  )
}
