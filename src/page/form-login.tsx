import { useForm } from "@mantine/form";
import { TextInput, Button, PasswordInput, Title, Paper } from "@mantine/core";
import { authentication, createDirectus, rest } from "@directus/sdk";
import { API_URL } from "../utils/url";

type DataSchema = {
  email: string;
  password: string;
};

export function FormLogin() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleAuthentication = async (email: string, password: string) => {
    const client = createDirectus(`${API_URL}`)
      .with(authentication("json"))
      .with(rest());
    console.log(client);
    try {
      await client.login(email, password);
      const token = await client.getToken();
      window.location.href = "/";
      localStorage.setItem("auth", JSON.stringify(token));
    } catch (error) {
      alert("Login failed.");
      console.error(error);
    }
  };

  const handleSubmit = (values: DataSchema) => {
    handleAuthentication(values.email, values.password);
  };

  return (
    <Paper maw={340} mx="auto" mt={20} p={12} withBorder>
      <Title ta={"center"} size={20}>
        Welcome
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="Your@gmail.com"
          value={form.values.email}
          onChange={(event) =>
            form.setFieldValue("email", event.currentTarget.value)
          }
          error={form.errors.email && "Invalid email"}
          radius="md"
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={form.values.password}
          onChange={(event) =>
            form.setFieldValue("password", event.currentTarget.value)
          }
          radius="md"
        />

        <Button type="submit" mt="md" radius={10} fullWidth color="green">
          Login
        </Button>
      </form>
    </Paper>
  );
}
