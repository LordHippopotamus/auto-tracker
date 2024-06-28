import { Container, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h3">Упс! Что то пошло не так.</Typography>
      <Typography>{error.statusText || error.message}</Typography>
    </Container>
  );
}
