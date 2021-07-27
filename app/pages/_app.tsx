import "app/styles/global.css"

import { ChakraProvider } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import Layout from "app/core/layouts/Layout"
import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  ErrorBoundary,
  ErrorComponent,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      onReset={useQueryErrorResetBoundary().reset}
    >
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
