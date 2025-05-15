import { Stack } from "@mui/material";
import Body from "./header/body/Body";
import SubjectSelection from "./subjectSelection/SubjectSelection";
import AnotherComponent from "./header/body/AnotherComponent";

export default function MainPage({ selectedSubject, setSelectedSubject }) {
  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
  };
  const renderComponent = () => {
    switch (selectedSubject) {
      case "Предмет1":
        return (
          <Body
            setSelectedSubject={setSelectedSubject}
            selectedSubject={selectedSubject}
          />
        );
      case "Предмет2":
        return (
          <AnotherComponent
            setSelectedSubject={setSelectedSubject}
            selectedSubject={selectedSubject}
          />
        );

      default:
        return <SubjectSelection onSubjectSelect={handleSubjectSelect} />;
    }
  };

  return (
    <Stack flexGrow={1} direction="column" p={4} backgroundColor={"#f8f8ff"}>
      {renderComponent()}
    </Stack>
  );
}
