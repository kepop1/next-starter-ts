import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../../stores/auth'
import {
  ROUTE_404,
  ROUTE_WELCOME,
  ROUTE_REGISTER,
  ROUTE_LOGIN,
} from '../../helpers/route-constants'

const publicPaths = [ROUTE_WELCOME, ROUTE_REGISTER, ROUTE_LOGIN]

type Props = {
  children: ReactElement<any, any> | null
}

export const GuardedRoute = ({ children }: Props) => {
  const router = useRouter()
  const { authToken, loading } = useAuth()

  useEffect(() => {
    const isPublicPath = publicPaths.includes(router.pathname)
    // Any unknown path automatically maps to /404
    const is404 = router.pathname === ROUTE_404

    if (!isPublicPath && !authToken && !loading && !is404) {
      router.replace(ROUTE_LOGIN)
    }
  }, [authToken, loading, router])

  return children
}
