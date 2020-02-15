import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { newAxios } from './http'

export const storeToken = ({ token }) => {
    cookie.set('token', token, { expires: 1 })
}

export const auth = ctx => {
    const { token } = nextCookie(ctx)

    /*
     * If `ctx.req` is available it means we are on the server.
     * Additionally if there's no token it means the user is not logged in.
     */
    if (ctx.req && !token) {
        ctx.res.writeHead(302, { Location: '/' })
        ctx.res.end()
    }
  
    // We already checked for server. This should only happen on client.
    if (!token) {
        Router.push('/')
    }
  
    return token
}
  
export const signout = () => {
    cookie.remove('token')
    // to support logging out from all windows
    window.localStorage.setItem('signout', Date.now())
    Router.push('/')
}
  
export const withAuthSync = WrappedComponent => {
    const Wrapper = props => {
        const syncLogout = event => {
            if (event.key === 'signout') {
                console.log('signout out from storage!')
                Router.push('/')
            }
        }
    
        useEffect(() => {
            window.addEventListener('storage', syncLogout)
    
            return () => {
                window.removeEventListener('storage', syncLogout)
                window.localStorage.removeItem('signout')
            }
        }, [null])
    
        return <WrappedComponent {...props} />
    }
  
    Wrapper.getInitialProps = async ctx => {
        newAxios(ctx)
        const token = auth(ctx)
    
        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))
    
        return { ...componentProps, token }
    }
  
    return Wrapper
}