import {
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, useMutation } from "blitz"
import React from "react"
import { Suspense } from "react"

import deleteUser from "../mutations/deleteUser"

const AccountInfo = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <></>
  }

  return (
    <Flex>
      <Input type="email" value={currentUser.email} disabled />
    </Flex>
  )
}

const AccountPage: BlitzPage = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [deleteUserMutation] = useMutation(deleteUser)

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Heading>My account</Heading>
      <Suspense fallback="Loading...">
        <AccountInfo />
      </Suspense>
      <Modal isCentered isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Delete your account</ModalHeader>
            <ModalBody>
              <Text>Are you sure to delete your account? This action is ireversible.</Text>
            </ModalBody>
            <ModalFooter w="100%">
              <Flex
                w="100%"
                flexDir="row"
                gridGap=".5rem"
                justifyContent="flex-end"
                alignContent="center"
              >
                <Button onClick={() => setShowModal(false)}>Maybe later</Button>
                <Button
                  colorScheme="red"
                  onClick={async () => {
                    await deleteUserMutation()
                  }}
                >
                  Yes, I&apos;m sure
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Button colorScheme="red" onClick={() => setShowModal(true)}>
        Delete my account
      </Button>
    </Flex>
  )
}

AccountPage.authenticate = true
AccountPage.getLayout = (page) => <Layout title="Account">{page}</Layout>

export default AccountPage
