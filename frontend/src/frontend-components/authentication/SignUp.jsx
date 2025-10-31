import { toaster } from "../../components/ui/toaster";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const navigate = useNavigate()

  const submitHandler = async () => {
    setPicLoading(true);
    if (!username || !email || !password || !conformPassword) {
      toaster.create({
        description: "Please Fill All Of The Fields",
        type: "error",
        duration: 5000,
        closable: true,
      });
      setPicLoading(false);
      return;
    }

    if (password !== conformPassword) {
      toaster.create({
        description: "Password Do Not Match",
        type: "error",
        duration: 5000,
        closable: true,
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { username, email, password, pic },
        config
      );

      toaster.create({
        description:"Registration Successfull",
        type:"success",
        duration:5000,
        closable:true
      })

      localStorage.setItem("userInfo", JSON.stringify(data));

      setPicLoading(false);
      navigate("/chats")
      
    } catch (error) {}
  };

  const postDetails = (pic) => {
    setPicLoading(true);
    if (pic == undefined) {
      toaster.create({
        description: "Picture is required!!",
        type: "error",
        duration: 5000,
        closable: true,
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "skullcloud");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/skullcloud/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        });
    } else {
      toaster.create({
        description: "Please Select an image!",
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };

  return (
    <VStack spacing="5px" p="10px">
      <Fieldset.Root size="lg" maxW="md" onSubmit={submitHandler}>
        <Stack>
          <Fieldset.Legend>Sign Up details</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide your contact details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input value={username} onChange={(e) => setName(e.target.value)} />
          </Field.Root>

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

          <Field.Root>
            <Field.Label>Conform password</Field.Label>
            <Input
              type="password"
              onChange={(e) => setConformPassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Upload Your Picture</Field.Label>
            <Input
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Field.Root>
        </Fieldset.Content>

        <Button
          type="submit"
          alignSelf="flex-start"
          width="100%"
          onClick={submitHandler}
          isLoading={picLoading}
        >
          Submit
        </Button>
      </Fieldset.Root>
    </VStack>
  );
};

export default SignUp;
