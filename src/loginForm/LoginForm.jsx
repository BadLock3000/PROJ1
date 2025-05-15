import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm({
  setIsAuthenticated,
  handleSubmit,
  username,
  setUsername,
  password,
  setPassword,
  message,
  setMessage,
}) {
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: "100%" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <TextField
                label="Номер студенческого"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Войти
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
