import { toaster } from "../../components/ui/toaster";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);


  const navigate = useNavigate();

  const submitHandler = async() => {
    setLoading(true);
    if (!email || !password) {
      toaster.create({
        title: "Please Fill All The Fields",
        type: "error",
        duration: 5000,
        closable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post("/api/user/login", {email, password}, config);

      toaster.create({
        description:"Login Successfully",
        type:"success",
        duration:5000,
        closable:true
      })

      console.log(data),

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats")


    } catch (error) {}
  };

  return (
    <VStack spacing="5px" p="10px">
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>Login details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your contact details below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Email address</Field.Label>
            <Input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          width="100%"
          onClick={submitHandler}
        >
          Submit
        </Button>
        <Button
          type="submit"
          alignSelf="flex-start"
          width="100%"
          onClick={() => {
            setEmail("guest@gmail.com");
            setPassword("123456");
          }}
        >
          Login as Guest
        </Button>
      </Fieldset.Root>
    </VStack>
  );
};

export default Login;
