import {
  Container,
  Button,
  TextField,
  Box,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { Form, redirect, useRouteError } from "react-router-dom";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw Error("validation error");
  }

  const data = new URLSearchParams();
  data.append("email", email);
  data.append("password", password);

  const res = await fetch("https://gps.autotracker.group/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.text();
    throw Error(error);
  }

  const user = await res.json();
  sessionStorage.setItem("user", JSON.stringify(user));
  return redirect(`/`);
};

const Login = () => {
  const error = useRouteError() as any;
  let errorMessage = "";

  switch (error?.message) {
    case "User":
      errorMessage = "Ошибка! Неверный email.";
      break;
    case "Password":
      errorMessage = "Ошибка! Неверный пароль.";
      break;
    default:
      errorMessage = "Ошибка! Попробуйте ещё раз.";
      break;
  }

  return (
    <Container maxWidth="sm" sx={{ my: 16 }}>
      <Paper elevation={1}>
        <Form method="post">
          <Box display="flex" flexDirection="column" gap={2} padding={4}>
            <Typography variant="h3" textAlign="center">
              Авторизация
            </Typography>
            <TextField
              name="email"
              type="email"
              label="Email"
              defaultValue="test@test.test"
            />
            <TextField
              name="password"
              type="password"
              label="Пароль"
              defaultValue={123321}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: "flex-end" }}
            >
              Войти
            </Button>
            {!!error && <Alert severity="error">{errorMessage}</Alert>}
          </Box>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
