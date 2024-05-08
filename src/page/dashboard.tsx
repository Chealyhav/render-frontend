import { useLogout } from "@refinedev/core";
import { Box, Button, Container } from "@mantine/core";

export const DashboardPage: React.FC = () => {
  const { mutate: logout } = useLogout();
  return (
    <Container>
      <Button bg={"red"} onClick={() => logout()} mt={10}>
        Logout
      </Button>

      <Box mt={20}>Dashboard</Box>
    </Container>
  );
};
