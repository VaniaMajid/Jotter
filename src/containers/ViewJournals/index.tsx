import { Divider, Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import { StyledHeader } from "Components/Header/header.style";
import Journal from "Components/Journal";
import { Journals, JournalsSection } from "Containers/ViewJournals/viewJournals.style";
import { RootState } from "Redux/store";

export default function ViewJournals() {
  const journals = useSelector((state: RootState) => state.journal.journals);
  const loading = useSelector((state: RootState) => state.journal.loading);


  return (
    <JournalsSection>
      {loading === "succeeded" ? (
        <>
          <StyledHeader>Your Journals</StyledHeader>
          <Divider />
          {journals.length > 0 ? (
            <Journals>
              {journals.map((journal) => (
                <Journal key={journal.id} journalData={journal} />
              ))}
            </Journals>
          ) : (
            <Empty
              style={{ margin: "auto" }}
              imageStyle={{ height: 200 }}
              description={
                <span style={{ fontFamily: "Klee One", fontWeight: "bold" }}>
                  No journals found
                </span>
              }
            />
          )}
        </>
      ) : (
        <Spin
          spinning={true}
          delay={500}
          size="large"
          style={{ margin: "auto", display: "flex", alignSelf: "center" }}
        />
      )}
    </JournalsSection>
  );
}
