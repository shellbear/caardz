import { Button, Flex, Grid, Icon, Text } from "@chakra-ui/react"
import logout from "app/auth/mutations/logout"
import { Head, Link, Routes, useMutation, useSession } from "blitz"
import { ReactNode } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  const session = useSession({ suspense: false })
  const [logoutMutation] = useMutation(logout)

  return (
    <>
      <Head>
        <title>{title || "caardz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="space-between" flexDir="column" minHeight="100vh">
        <Flex flexDirection="column">
          <Flex
            as="nav"
            align="center"
            bg="transparent"
            w="100%"
            justifyContent="center"
            alignContent="center"
          >
            <Flex
              w="100%"
              maxW="1200px"
              justify="space-between"
              wrap="wrap"
              mb={8}
              p={8}
              color="primary.700"
            >
              <Link href={Routes.Home()}>
                <a>
                  <Text fontWeight="bold">Caardz</Text>
                </a>
              </Link>
              <Flex gridGap="1.5rem" alignItems="center">
                {session.userId ? (
                  <>
                    <Button variant="outline" leftIcon={<Icon />}>
                      New Page
                    </Button>
                    <Link href={Routes.AccountPage()}>
                      <a>
                        <Button variant="ghost">Account</Button>
                      </a>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={async () => {
                        await logoutMutation({})
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href={Routes.LoginPage()}>
                      <a>Login</a>
                    </Link>
                    <Link href={Routes.SignupPage()}>
                      <a>Sign up</a>
                    </Link>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="center">
            <Flex as="main" w="1200px" alignContent="center">
              {children}
            </Flex>
          </Flex>
        </Flex>

        <Grid as="footer" bg="gray.100" py="3rem" px="10rem" gridTemplateColumns="1fr 1fr">
          <a href="https://shellbear.me/">
            <Text>Made by shellbear</Text>
          </a>
          <a href="https://shellbear.me/">
            <Text>Source code</Text>
          </a>
        </Grid>
      </Flex>
    </>
  )
}

export default Layout
