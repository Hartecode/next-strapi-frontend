import { Flex, FlexProps, Box, Container, List, ListItem, Icon } from '@chakra-ui/react'
import { AiFillFacebook } from "react-icons/ai"

const Footer = (props: FlexProps) => (
    <Container as="footer" bg="blue.900" color="white" maxW="container.xl">
      <Flex as="footer" bg="blue.900" color="white" py="2rem" {...props} >
        <Box>Harte Code</Box>
        <Box>Harte Code</Box>
        <List d="flex" spacing={3} my={0}>
          <ListItem >
            <Icon as={AiFillFacebook} />
          </ListItem>
          <ListItem></ListItem>
        </List>
      </Flex>
    </Container>
)

export default Footer