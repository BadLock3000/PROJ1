import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { downloadUserResultsPDF } from "../../../../pdfUtils";

export default function TableResult({ groupedResults }) {
  return (
    <Stack direction="column" gap={2}>
      {Object.entries(groupedResults).map(([username, results]) => (
        <Accordion key={username}>
          <AccordionSummary>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%", alignItems: "center" }}
            >
              <Typography>
                {results[0].display_name} ({username})
              </Typography>
              <Button
                variant="contained"
                onClick={(event) => {
                  event.stopPropagation(); // Останавливаем всплытие события
                  downloadUserResultsPDF(results); // Используем функцию из pdfUtils.js
                }}
              >
                Скачать PDF
              </Button>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Лабораторная работа</TableCell>
                    <TableCell>Результат</TableCell>
                    <TableCell>Дата выполнения</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        Лабораторная работа {result.lab_number}
                      </TableCell>
                      <TableCell>
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {result.result}
                        </pre>
                      </TableCell>
                      <TableCell>
                        {new Date(result.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
