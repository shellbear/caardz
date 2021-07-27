import { Flex } from "@chakra-ui/react"
import Bio from "app/core/components/widgets/Bio"
import Layout from "app/core/layouts/Layout"
import deleteProject from "app/projects/mutations/deleteProject"
import getProjectByName from "app/projects/queries/getProjectByName"
import { BlitzPage, Head, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense, useEffect, useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"

const ResponsiveGridLayout = WidthProvider(Responsive)

export const Project = () => {
  const router = useRouter()
  const projectName = useParam("name", "string")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProjectByName, { name: projectName })

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>

      <Flex>
        <ResponsiveGridLayout
          className="layout"
          onLayoutChange={(layout) => {
            localStorage.setItem("layout", JSON.stringify(layout))
          }}
          isResizable={false}
          isDraggable={false}
          autoSize
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
    </>
  )
}

const ShowProjectPage: BlitzPage = () => {
  return (
    <Flex width="max(100%, 100vw)" height="max(100%, 100vh)" bg="beige">
      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </Flex>
  )
}

ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
