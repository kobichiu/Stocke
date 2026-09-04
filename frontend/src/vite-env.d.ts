/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

import type { SubmitEventHandler } from 'react'

declare module 'react-router' {
    interface FetcherFormProps {
        onSubmit?: SubmitEventHandler<HTMLFormElement>
    }
}