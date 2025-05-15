import { Button, Stack } from "@mui/material";
import { listSubjects } from "../../../subjectsConfig";

export default function SubjectSelection({ onSubjectSelect }) {
  const handleSelectLab = (numberLab) => {
    onSubjectSelect(numberLab);
  };

  return (
    <Stack direction="column" gap={2}>
      {listSubjects.map((option) => (
        <Button
          key={option.numberLab}
          onClick={() => handleSelectLab(option.name)}
          variant="contained"
          sx={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            width: "20%",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          {option.name}
        </Button>
      ))}
    </Stack>
  );
}
