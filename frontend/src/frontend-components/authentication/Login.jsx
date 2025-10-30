import { Button, Field, Fieldset, Input, Stack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

        console.log(email)
    
        const submitHandler =() => {
    
        }
    
  return (
    <VStack spacing="5px" p="10px">
             <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Login details</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your contact details below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content >
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
            </Field.Root>
    
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Field.Root>
    
          </Fieldset.Content>
    
          <Button type="submit" alignSelf="flex-start" width="100%" onClick={submitHandler}>
            Submit
          </Button>
          <Button type="submit" alignSelf="flex-start" width="100%" onClick={() => {setEmail("guest@gmail.com"); setPassword("123456")}}>
            Login as Guest
          </Button>
        </Fieldset.Root>
        </VStack>
  )
}

export default Login