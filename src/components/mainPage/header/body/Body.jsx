import { Button, Stack } from "@mui/material";
import { useState } from "react";
import ChoosingSubject from "./choosingSubject/ChoosingSubject";
import axios from "axios";
import BodyList from "./bodyList/BodyList";
import { listLabsForBody } from "../../../../labsConfig";

export default function Body({ setSelectedSubject, selectedSubject }) {
  const [labId, setLabId] = useState("");
  const [numberLab, setNumberLab] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listLabs = listLabsForBody;
  const handleRunTest = async () => {
    const token = localStorage.getItem("token"); // Получение токена из localStorage
    setIsLoading(true); // Установите состояние загрузки в true перед запросом
    try {
      const response = await axios.post(
        "http://localhost:3000/run-tests",
        {
          labId: labId,
          numberLab: numberLab,
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
          setLabId={setLabId}
          setNumberLab={setNumberLab}
          selectedNumberLab={numberLab}
        />
        <Button onClick={() => setSelectedSubject(null)} variant="contained">
          Назад
        </Button>
      </Stack>
      <BodyList
        numberLab={numberLab}
        handleRunTest={handleRunTest}
        labId={labId}
        message={message}
        isLoading={isLoading}
        setLabId={setLabId}
      />
    </Stack>
  );
}
