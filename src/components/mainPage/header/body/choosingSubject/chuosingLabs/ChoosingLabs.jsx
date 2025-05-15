import { Box, Stack } from "@mui/material";

export default function ChoosingLabs({ value, setValue, options, listLabs }) {
  return (
    <Box mt={2}>
      {value && (
        <Stack
          boxShadow={2}
          direction={"column"}
          borderRadius={3}
          backgroundColor={"#e3e0de"}
        >
          {listLabs.map((lab, index) => {
            if (lab.name === value) {
              return lab.labs.map((labItem, labIndex) => {
                const isFirstItem = labIndex === 0;
                const isLastItem = labIndex === lab.labs.length - 1;
                return (
                  <Stack
                    p={1}
                    key={labIndex}
                    height={"40px"}
                    border={"1px solid #b3aca8"}
                    borderBottom={isLastItem ? "none" : "1px solid #b3aca8"}
                    justifyContent={"center"}
                    sx={{
                      cursor: "pointer",
                      ":hover": { bgcolor: "#b3aca8" },
                      borderRadius: isFirstItem
                        ? "10px 10px 0 0"
                        : isLastItem
                        ? "0 0 10px 10px"
                        : "0", // Скругление углов для первого и последнего элемента
                    }}
                  >
                    {labItem}
                  </Stack>
                );
              });
            }
          })}
        </Stack>
      )}
    </Box>
  );
}
