import { Flex, Heading } from "@chakra-ui/react"
import Bio from "app/core/components/widgets/Bio"
import deleteProject from "app/projects/mutations/deleteProject"
import getUserProject from "app/projects/queries/getUserProject"
import { BlitzPage, Head, useMutation, useParam, useQuery } from "blitz"
import { Suspense } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)

export const EditProject = () => {
  const projectName = useParam("name", "string")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getUserProject, { name: projectName })

  return (
    <Flex flexDir="column" w="100%">
      <Head>
        <title>{project.name}</title>
      </Head>

      <style global jsx>{`
        body {
          background-color: beige;
        }
      `}</style>

      <Heading textAlign="center">{project.name}</Heading>

      <Flex>
        <ResponsiveGridLayout
          className="layout"
          onLayoutChange={(layout) => {
            localStorage.setItem("layout", JSON.stringify(layout))
          }}
          isResizable={false}
          autoSize
          isDraggable
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 5, sm: 4, xs: 3, xxs: 2 }}
          width={1200}
        >
          {[...Array(10).keys()].map((i) => (
            <div key={i}>
              <Bio key={i} title={project.name} text={project.name} />
            </div>
          ))}
        </ResponsiveGridLayout>
      </Flex>
    </Flex>
  )
}

const EditProjectPage: BlitzPage = () => {
  return (
    <Flex width="max(100%, 100vw)" height="max(100%, 100vh)">
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject />
      </Suspense>
    </Flex>
  )
}

EditProjectPage.authenticate = true

export default EditProjectPage
