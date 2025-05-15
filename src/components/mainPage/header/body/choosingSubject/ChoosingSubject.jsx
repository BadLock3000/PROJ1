import React from "react";
import { Stack, Button } from "@mui/material";

export default function ChoosingSubject({
  options,
  setNumberLab,
  selectedNumberLab,
}) {
  const handleSelectLab = (numberLab) => {
    setNumberLab(numberLab);
  };

  return (
    <Stack direction="column" gap={2}>
      {options.map((option) => (
        <Button
          key={option.numberLab}
          onClick={() => handleSelectLab(option.numberLab)}
          variant="contained"
          sx={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor:
              selectedNumberLab === option.numberLab
                ? "#1976d2"
                : "rgb(175, 189, 202)",
            color: "#fff",
            "&:hover": {
              backgroundColor:
                selectedNumberLab === option.numberLab
                  ? "#1976d2"
                  : "rgb(175, 189, 202)",
            },
          }}
        >
          {option.name}
        </Button>
      ))}
    </Stack>
  );
}
