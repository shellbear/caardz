import { Flex, Heading, Text } from "@chakra-ui/react"
import React, { ReactNode } from "react"

export interface CardProps {
  size: "xs" | "md" | "xl"
  children?: ReactNode
}

export const Card = ({ size, children }: CardProps): JSX.Element => (
  <div>
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
      {children}
    </Flex>
  </div>
)

export default Card
