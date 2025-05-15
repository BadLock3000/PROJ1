import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

export default function BodyList({
  handleRunTest,
  setLabId,
  labId,
  message,
  isLoading,
  numberLab,
}) {
  return (
    <Stack
      p={1}
      borderRadius={3}
      direction="column"
      width="100%"
      backgroundColor="white"
      gap={2}
      flexGrow={1}
    >
      <Stack
        alignItems="center"
        justifyContent={"space-between"}
        direction="row"
        gap={2}
      >
        <Stack direction="row" gap={2}>
          <Typography variant="h6">Введите id лабораторной работы:</Typography>
          <TextField
            type="number"
            placeholder="id лабораторной работы"
            value={labId}
            size="small"
            variant="outlined"
            onChange={(e) => setLabId(e.target.value)}
          />
        </Stack>

        <Tooltip
          title={
            labId || numberLab ? "" : "Введите id и номер лабораторной работы"
          }
          disableInteractive
        >
          <Box>
            <Button
              variant="contained"
              disabled={!labId || !numberLab}
              onClick={handleRunTest}
            >
              Запустить автотест
            </Button>
          </Box>
        </Tooltip>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Typography variant="body1" whiteSpace="pre-line">
          {message.result}
        </Typography>
      )}
    </Stack>
  );
}
