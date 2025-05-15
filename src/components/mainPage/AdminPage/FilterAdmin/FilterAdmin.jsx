import { Autocomplete, Stack, TextField } from "@mui/material";
import { useLayoutEffect, useState } from "react";

export default function FilterAdmin({ labResults, setFilteredLabResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [labNumberQuery, setLabNumberQuery] = useState(null);

  // Получаем уникальные номера лабораторных работ
  const uniqueLabNumbers = [
    ...new Set(labResults.map((result) => result.lab_number.toString())),
  ]
    .map((labNumber) => ({
      label: `Лабораторная работа ${labNumber}`,
      value: labNumber,
    }))
    .sort((a, b) => parseInt(a.value) - parseInt(b.value));

  // Фильтрация данных
  useLayoutEffect(() => {
    let filtered = labResults;

    // Фильтр по имени
    if (searchQuery) {
      filtered = filtered.filter((result) =>
        result.display_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по номеру лабораторной работы
    if (labNumberQuery) {
      filtered = filtered.filter(
        (result) => result.lab_number.toString() === labNumberQuery.value
      );
    }

    // Передаем отфильтрованные данные в родительский компонент
    setFilteredLabResults(filtered);
  }, [searchQuery, labNumberQuery, labResults, setFilteredLabResults]);

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Поиск по имени"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Autocomplete
        options={uniqueLabNumbers}
        value={labNumberQuery}
        onChange={(_, newValue) => setLabNumberQuery(newValue)}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Фильтр по лабораторной работе"
            variant="outlined"
            fullWidth
            sx={{ width: "300px" }}
          />
        )}
      />
    </Stack>
  );
}
