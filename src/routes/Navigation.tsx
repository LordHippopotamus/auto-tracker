import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navigation = ({ user }: { user: { [key: string]: string } | null }) => (
  <AppBar position="static">
    <Toolbar>
      <Box display="flex" gap={1} flexGrow={1}>
        <Typography variant="h6" component="div">
          АвтоТрек
        </Typography>
        <Button component={Link} to="/devices" color="inherit">
          Устройства
        </Button>
      </Box>

      {user ? (
        <Typography>Вы вошли как {user.name}</Typography>
      ) : (
        <Button component={Link} to="/login" color="inherit">
          Войти
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Navigation;
