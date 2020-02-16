import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const storeToken = ({ token }) => {
    cookie.set('token', token, { expires: 1 })
    Router.push('/home')
}

export const auth = ctx => {
    const { token } = nextCookie(ctx)

    /*
     * Additionally if there's no token it means the user is not logged in.
     */
    if (!token) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: '/' })
            ctx.res.end()
        } else {
            Router.push('/')
        }
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
        }, [])
    
        return <WrappedComponent {...props} />
    }
  
    Wrapper.getInitialProps = async ctx => {
        const token = auth(ctx)
    
        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))
    
        return { ...componentProps, token }
    }
  
    return Wrapper
}

export const withAuthRedirect = WrappedComponent => {
    const Wrapper = props => <WrappedComponent {...props} />

    Wrapper.getInitialProps = async ctx => {
        const { token } = nextCookie(ctx)

        if (token) {
            if (typeof window === 'undefined') {
                ctx.res.writeHead(302, { Location: '/home' })
                ctx.res.end()
            } else {
                Router.push('/home')
            }
        }
    
        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx))
    
        return { ...componentProps, token }
    }
  
    return Wrapper
}