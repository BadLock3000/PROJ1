import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import FilterAdmin from "./FilterAdmin/FilterAdmin";
import SubjectSelection from "../subjectSelection/SubjectSelection";
import TableResult from "./TableResult/TableResult.";
import { fetchLabResults } from "../../../API/fetchLabResults";

export default function AdminPage({
  isAuthenticated,
  selectedSubject,
  setSelectedSubject,
}) {
  const [labResults, setLabResults] = useState([]);
  const [filteredLabResults, setFilteredLabResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLabResults = async () => {
      setIsLoading(true);
      try {
        const results = await fetchLabResults();
        setLabResults(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getLabResults();
  }, [isAuthenticated, selectedSubject]);

  // Фильтруем результаты по выбранному предмету
  const filteredBySubject = useMemo(() => {
    if (selectedSubject) {
      return labResults.filter((result) => result.subject === selectedSubject);
    }
    return labResults;
  }, [selectedSubject, labResults]);

  // Стабилизируем setFilteredLabResults с помощью useCallback
  const handleFilteredResults = useCallback((results) => {
    setFilteredLabResults(results);
  }, []);

  if (isLoading) {
    return <Typography>Загрузка данных...</Typography>;
  }

  // Группируем результаты по пользователю
  const groupedResults = filteredLabResults.reduce((acc, result) => {
    const key = result.username;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(result);
    return acc;
  }, {});

  // Обработчик выбора предмета
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <Stack sx={{ backgroundColor: "#f8f8ff", flexGrow: 1, p: 4, gap: 2 }}>
      {selectedSubject ? (
        // Если предмет выбран, показываем результаты
        <Stack direction="column" gap={2}>
          <Stack direction="row" gap={4} alignItems="center">
            <Typography variant="h6">Результаты лабораторных работ</Typography>
            <Button variant="outlined" onClick={() => setSelectedSubject(null)}>
              Назад к выбору предмета
            </Button>
          </Stack>
          <FilterAdmin
            labResults={filteredBySubject}
            setFilteredLabResults={handleFilteredResults}
          />
          <TableResult groupedResults={groupedResults} />
        </Stack>
      ) : (
        // Если предмет не выбран, показываем выбор предмета
        <SubjectSelection onSubjectSelect={handleSubjectSelect} />
      )}
    </Stack>
  );
}
