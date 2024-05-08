import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { CatchAllNavigate } from "@refinedev/react-router-v6";
import { AuthProvider, Authenticated, Refine } from "@refinedev/core";
import { DashboardPage } from "./page/dashboard";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { FormLogin } from "./page/form-login";

const authProvider: AuthProvider = {
  login: async () => {
    const token = localStorage.getItem("auth");
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
      return {
        success: true,
        redirectTo: "/",
        successNotification: {
          message: "Login Successful",
          description: "You have successfully logged in.",
        },
      };
    }
    return {
      success: false,
      error: {
        message: "Login Error",
        name: "Invalid email or password",
      },
    };
  },
  check: async () => {
    const token = localStorage.getItem("auth");

    if (token) {
      return {
        authenticated: true,
        redirectTo: "/",
      };
    }
    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("auth");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  onError: (error) => {
    const status = error.status;
    if (status === 418) {
      return Promise.resolve({
        logout: true,
        redirectTo: "/login",
        error: new Error(error),
      });
    }
    return Promise.resolve({});
  },
};


function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          resources={[
            {
              name: "dashboard",
            },
          ]}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <DashboardPage/>
                </Authenticated>
              }
            ></Route>
            <Route path="/login" element={<FormLogin />} />
          </Routes>
        </Refine>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
