import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { Popconfirm, Popover, Spin } from "antd";
import { CiMenuKebab } from "react-icons/ci";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteDoc, doc } from "firebase/firestore";
import {
  ActionButton,
  ActionButtonCont,
  DescSection,
  JournalData,
  StyledCarousel,
  StyledDescription,
  StyledImage,
  StyledImageSection,
} from "Containers/JournalContainer/journalCont.style";
import { StyledHeader } from "Components/Header/header.style";
import { auth, database, storage } from "Firebase/config";
import { AppDispatch, RootState } from "Redux/store";
import { fetchJournals } from "Redux/reducers/journalSlice";

function JournalCont() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { journalId } = useParams<{ journalId: string }>();
  const user = useSelector((state: RootState) => state.user);
  const journalData = useSelector((state: RootState) =>
    state.journal.journals.find((journal) => journal.id === journalId)
  )!;
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const fetchImageUrls = async () => {
    const imagePromises = journalData.images.map(async (imagePath) => {
      const imageRef = ref(storage, imagePath);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    });

    return Promise.all(imagePromises);
  };

  useEffect(() => {
    fetchImageUrls().then((urls) => {
      setImageUrls(urls);
      console.log(imageUrls);
    });
  }, [journalData]);

  const editJournal = async () => {
    navigate(`/createjournal/${journalId}`);
  };

  const deleteJournal = async () => {
    await deleteDoc(
      doc(database, `journals/${user.userId}/entries/${journalId}`)
    );
    
    dispatch(fetchJournals(auth.currentUser!.uid));
    navigate("/");
  };

  const content = (
    <ActionButtonCont>
      <ActionButton onClick={editJournal} icon={<EditOutlined />}>
        Edit
      </ActionButton>
      <Popconfirm
        title="Delete Journal"
        description="Are you sure you want to delete this Journal?"
        onConfirm={deleteJournal}
        okText="Yes"
        cancelText="No"
      >
        <ActionButton icon={<DeleteOutlined />}>Delete</ActionButton>
      </Popconfirm>
    </ActionButtonCont>
  );

  return (
    <JournalData>
      {journalData ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <StyledHeader>{journalData.title}</StyledHeader>
            <Popover
              placement="leftTop"
              title="Actions"
              content={content}
              trigger="click"
            >
              <CiMenuKebab style={{ fontSize: "23px" }} />
            </Popover>
          </div>

          <DescSection>
            <StyledDescription>{journalData.description}</StyledDescription>
            {imageUrls.length > 0 ? (
              <StyledCarousel autoplay>
                {imageUrls.map((imageUrl, index) => (
                  <StyledImageSection key={index}>
                    <StyledImage
                      width="100%"
                      height="21vh"
                      src={imageUrl}
                      alt={`Image ${index}`}
                    />
                  </StyledImageSection>
                ))}
              </StyledCarousel>
            ) : (
              <></>
            )}
          </DescSection>
        </>
      ) : (
        <Spin
          spinning={true}
          delay={500}
          size="large"
          style={{ margin: "auto", display: "flex", alignSelf: "center" }}
        />
      )}
    </JournalData>
  );
}

export default JournalCont;
