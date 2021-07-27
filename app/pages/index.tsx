import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import { BlitzPage, Link, Routes, usePaginatedQuery, useRouter, useSession } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 100

const ProjectList = () => {
  const router = useRouter()
  const session = useSession()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    where: { userId: session.userId! },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  if (projects.length === 0) {
    return (
      <Flex alignItems="center" w="100%" flexDir="column" gridGap="1.5rem">
        <Text>Get started by creating a new project.</Text>
        <Link href={Routes.NewProjectPage()}>
          <a>
            <Button>Create a new project</Button>
          </a>
        </Link>
      </Flex>
    )
  }

  return (
    <Flex>
      {projects.map(({ name, updatedAt }) => (
        <Link
          key={name}
          href={Routes.EditProjectPage({
            name,
          })}
        >
          <a>
            <Flex
              flexDir="column"
              borderRadius="md"
              bg="white"
              shadow="md"
              py="2rem"
              px="3rem"
              _hover={{
                shadow: "lg",
              }}
            >
              <Text fontSize="2xl">{name}</Text>
              <Text fontSize="sm">Last updated {updatedAt.toDateString()}</Text>
            </Flex>
          </a>
        </Link>
      ))}
    </Flex>
  )
}

const Home: BlitzPage = () => {
  const session = useSession({ suspense: false })

  if (session.userId) {
    return (
      <Flex w="100%" flexDir="column" alignItems="center" gridGap="3rem">
        <Heading as="h1">Pages</Heading>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectList />
        </Suspense>
      </Flex>
    )
  }

  return (
    <Flex>
      <Text>You must log in</Text>
    </Flex>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
