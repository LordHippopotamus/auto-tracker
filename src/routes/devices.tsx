import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { LoaderData } from "../types/LoaderData";

export const loader = (async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  const res = await fetch(`api/devices${id && "?id=" + id}`);
  const devices = (await res.json()) as { [key: string]: any }[];
  return { devices };
}) satisfies LoaderFunction;

const Devices = () => {
  const { devices } = useLoaderData() as LoaderData<typeof loader>;
  const navigation = useNavigation();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("id");
  return (
    <Container sx={{ my: 4 }}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h2"> Устройства</Typography>
        <Box mt={4}>
          <Form role="search">
            <Box display="flex" gap={2}>
              <TextField
                type="search"
                name="id"
                size="small"
                label="Поиск по id"
              />
              <Button disabled={searching} type="submit" variant="contained">
                Искать
              </Button>
            </Box>
          </Form>
        </Box>
        <Box maxWidth={1} overflow="scroll" mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>name</TableCell>
                <TableCell>uniqueId</TableCell>
                <TableCell>status</TableCell>
                <TableCell>lastUpdate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map((el) => (
                <TableRow key={el.uniqueId}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.uniqueId}</TableCell>
                  <TableCell>{el.status}</TableCell>
                  <TableCell>
                    {new Date(el.lastUpdate).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default Devices;
