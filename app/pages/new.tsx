import { Flex, Heading } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { FORM_ERROR, ProjectForm } from "app/projects/components/ProjectForm"
import createProject from "app/projects/mutations/createProject"
import { CreateProject } from "app/projects/validations"
import { BlitzPage, Routes, useMutation, useRouter, useSession } from "blitz"

const NewProjectPage: BlitzPage = () => {
  const router = useRouter()
  const session = useSession({ suspense: false })
  const [createProjectMutation] = useMutation(createProject)

  return (
    <Flex flexDir="column" w="100%" alignItems="center" gridGap="3rem">
      <Heading>Create New Project</Heading>
      <ProjectForm
        submitText="Create Project"
        schema={CreateProject}
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const project = await createProjectMutation(values)
            router.push(
              Routes.EditProjectPage({
                name: project.name,
              })
            )
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </Flex>
  )
}

NewProjectPage.authenticate = true
NewProjectPage.getLayout = (page) => <Layout title="Create New Project">{page}</Layout>

export default NewProjectPage
