import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python"; // Для подсветки Python

import { lineNumbers } from "@codemirror/view"; // Номера строк
export default function BodyList2({
  handleRunTest,
  message,
  isLoading,
  numberLab,
  userCode,
  setUserCode,
}) {
  console.log({ veeeeeeeeeeeeeeeeeeeeee: userCode });
  const handleRunTestWithCode = () => {
    const data = {
      numberLab,
      code: userCode, // Добавляем код пользователя
    };
    handleRunTest(data); // Передаем данные в функцию handleRunTest
  };

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
        <Box>
          <Typography>Введите свой код</Typography>
        </Box>
        <Tooltip
          title={numberLab ? "" : "Введите id и номер лабораторной работы"}
          disableInteractive
        >
          <Stack>
            <Button
              variant="contained"
              disabled={!numberLab}
              onClick={handleRunTestWithCode} // Используем новую функцию
            >
              Запустить автотест
            </Button>
          </Stack>
        </Tooltip>
      </Stack>

      {/* Редактор кода с использованием CodeMirror */}
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <CodeMirror
          value={userCode}
          height="100%"
          extensions={[python(), lineNumbers()]} // Подсветка Python + номера строк
          onChange={(value) => setUserCode(value)} // Обновляем состояние при изменении кода
        />
      </Box>

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
