import { Flex, Heading, Text } from "@chakra-ui/react"
import React from "react"

export interface BioProps {
  title: string
  text: string
}

export const Bio = ({ title, text }: BioProps): JSX.Element => (
  <Flex
    width="100%"
    height="100%"
    flexDirection="column"
    py=".5rem"
    px="1rem"
    boxShadow="md"
    rounded="xl"
    transition="ease .5s"
    _hover={{
      boxShadow: "xl",
    }}
  >
    <Heading color="black">{title}</Heading>
    <Text color="black">{text}</Text>
  </Flex>
)

export default Bio
