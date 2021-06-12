import React from 'react'
import App, { AppContext } from 'next/app'
import { storeWrapper } from '@store/store'

import '@styles/globals.scss'


class MyApp extends App {
    static async getServer({ Component, ctx }: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default storeWrapper.withRedux(MyApp)
