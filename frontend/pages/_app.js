import React from 'react'
import App from "next/app";
import Head from 'next/head'
import { Provider as ReduxProvider } from "react-redux";
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import { initializeStore } from '../redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import DefaultLayout from '../components/layouts/Default'
import ErrorMessage from '../components/ErrorMessage'

class MyApp extends App {
    constructor (props) {
        super(props)
        this.persistor = persistStore(props.store)
    }

    render() {
        const {Component, pageProps, store} = this.props;
        const Layout = Component.Layout || DefaultLayout
        const childComponent = (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )

        return (
            <ReduxProvider store={store}>
                <Head>
                    <title>Twitter</title>
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <PersistGate loading={childComponent} persistor={this.persistor}>
                    {childComponent}
                    <ErrorMessage/>
                </PersistGate>
            </ReduxProvider>
        );
    }
}

export default withRedux(initializeStore)(withReduxSaga(MyApp));