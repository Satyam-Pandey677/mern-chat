import { Button, Field, Fieldset, For, Input, NativeSelect, Stack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setConformPassword] = useState("");
    const [image, setimage] = useState("");

    const submitHandler =() => {

    }

    const postDetails= (pos) => {

    }

    

  return (
    <VStack spacing="5px" p="10px">
         <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Sign Up details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content >
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input value={name} onChange={(e) => setName(e.target.value)}/>
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
        </Field.Root>

        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
        </Field.Root>

        <Field.Root>
          <Field.Label>Conform password</Field.Label>
          <Input type="password" onChange={(e) => setConformPassword(e.target.value)}/>
        </Field.Root>

        <Field.Root>
          <Field.Label>Upload Your Picture</Field.Label>
          <Input type="file" onChange={(e) => postDetails(e.target.files[0])}/>
        </Field.Root>


      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start" width="100%" onClick={submitHandler}>
        Submit
      </Button>
    </Fieldset.Root>
    </VStack>
  )
}

export default SignUp