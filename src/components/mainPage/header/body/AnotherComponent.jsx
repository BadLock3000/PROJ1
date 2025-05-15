import { Button, Stack } from "@mui/material";
import { useState } from "react";
import ChoosingSubject from "./choosingSubject/ChoosingSubject";
import axios from "axios";

import BodyList2 from "./bodyList2/BodyList2";
import { listLabsForAnotherComponent } from "../../../../labsConfig";

export default function AnotherComponent({
  setSelectedSubject,
  selectedSubject,
}) {
  const [numberLab, setNumberLab] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userCode, setUserCode] = useState(""); // Состояние для хранения кода пользователя
  const listLabs = listLabsForAnotherComponent;
  const handleRunTest = async () => {
    const token = localStorage.getItem("token"); // Получение токена из localStorage
    setIsLoading(true); // Установите состояние загрузки в true перед запросом
    try {
      const response = await axios.post(
        "http://localhost:3000/run-tests",
        {
          numberLab: numberLab,
          userCode: userCode,
          selectedSubject: selectedSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data);
    } catch (error) {
      setMessage(`Error: ${error.response.data}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack direction="row" width="100%" flexGrow={1} gap={5}>
      <Stack direction="column" justifyContent={"space-between"}>
        <ChoosingSubject
          options={listLabs}
          setNumberLab={setNumberLab}
          selectedNumberLab={numberLab}
        />
        <Button onClick={() => setSelectedSubject(null)} variant="contained">
          Назад
        </Button>
      </Stack>
      <BodyList2
        userCode={userCode}
        setUserCode={setUserCode}
        numberLab={numberLab}
        handleRunTest={handleRunTest}
        message={message}
        isLoading={isLoading}
      />
    </Stack>
  );
}
