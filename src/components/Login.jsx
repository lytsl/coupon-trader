import { Navbar } from "./Navbar";
import { useForm } from "@mantine/form";
import { PasswordInput, Box, TextInput, Button, Group } from "@mantine/core";
import { Grid } from '@mantine/core';

export default function Login() {
  const form = useForm({
    initialValues: {email: ""},

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div>
      <Navbar fluid />
      <center>
        <h1 className="Heading">Log In your Profile</h1>
      </center>
      <Grid grow gutter="xs">
      <Grid.Col span={0}>
      <Box sx={{ maxWidth: 340 }} mx="auto">
        <form onSubmit={form.onSubmit(console.log)}>
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
      </Grid.Col>
      <Grid.Col span={0}>Sanket</Grid.Col>
      </Grid>
    </div>
  );
}
