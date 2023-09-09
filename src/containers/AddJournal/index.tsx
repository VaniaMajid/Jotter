import { Divider, Image, Spin } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { CameraOutlined } from "@ant-design/icons";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useDispatch, useSelector } from "react-redux";
import { auth, database, storage } from "Firebase/config";
import ButtonComponent from "Components/BtnComponent";
import JournalInput from "Components/JournalInput";
import {
  AddJournalSection,
  DelBtn,
  DescSection,
  ImgCont,
  ImgPreview,
  ImgUpload,
  ImgUploadSection,
} from "Containers/AddJournal/addJournal.style";
import { StyledHeader } from "Components/Header/header.style";
import { AppDispatch, RootState } from "Redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "Redux/reducers/userSlice";

export default function AddNewJournal() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { journalId } = useParams<{ journalId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);

  const isEdit = !!journalId;
  const initialFormState = {
    title: "",
    description: "",
  };

  const [formValues, setFormValues] = useState(initialFormState);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [errMsg, setErrMsg] = useState("");
  const [showAddButton, setShowAddButton] = useState(true);

  const journalData = useSelector((state: RootState) =>
    state.journal.journals.find((journal) => journal.id === journalId)
  );
  console.log(journalData);
  console.log(selectedFiles);
  console.log(isLoading);

  useEffect(() => {
    console.log(journalData);
    if (isEdit && journalData) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid } = user;
          const { displayName } = user;
          const { email } = user;

          dispatch(setUser({ userId: uid, displayName, email }));
        } else {
          dispatch(setUser({ userId: null, displayName: null, email: null }));
        }
      });

      setFormValues({
        title: journalData.title,
        description: journalData.description,
      });

      const fetchImages = async () => {
        const imagePromises = journalData.images.map(async (imagePath) => {
          const imageRef = ref(storage, imagePath);
          const imageUrl = await getDownloadURL(imageRef);
          return imageUrl;
        });

        const imageUrls = await Promise.all(imagePromises);
        setSelectedFiles(imageUrls);
        if (selectedFiles.length > 0) {
          setIsLoading(false);
        }
      };

      fetchImages();
    } else {
      setIsLoading(false);
    }
  }, [isEdit, journalData, selectedFiles]);

  
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log(files);
    if (files.length + selectedFiles.length <= 3) {
      setErrMsg("");
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      setErrMsg("Select 3 images at max!");
    }

    if (files.length + selectedFiles.length == 3) {
      setShowAddButton(false);
    }
  };

  const uploadImages = async (journalId: string) => {
    if (selectedFiles === null) {
    } else {
      const imagePaths = await Promise.all(
        selectedFiles.map(async (file) => {
          const storageRef = ref(
            storage,
            `images/${user.userId}/${journalId}/${file.name}`
          );
          const snapshot = await uploadBytes(storageRef, file);
          return snapshot.ref.fullPath;
        })
      );
      return imagePaths;
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setShowAddButton(true);
  };

  const handleSave = async () => {
    if (!formValues.title || !formValues.description) {
      setErrMsg("Please fill in all fields and upload images!");
      return;
    }

    try {
      const journalData = {
        userId: user.userId,
        title: formValues.title,
        description: formValues.description,
        images: isEdit ? selectedFiles : [],
        timestamp: new Date(),
      };

      if (isEdit) {
        const updatedJournalData = {
          ...journalData,
          images: selectedFiles,
        };

        await setDoc(
          doc(database, `journals/${user.userId}/entries/${journalId}`),
          updatedJournalData
        );
      } else {
        const docRef = await addDoc(
          collection(database, `journals/${user.userId}/entries`),
          journalData
        );
        const journalId = docRef.id;

        const imagePaths = await uploadImages(journalId);

        const journalDataWithImages = {
          ...journalData,
          images: imagePaths,
        };

        await setDoc(
          doc(database, `journals/${user.userId}/entries/${journalId}`),
          journalDataWithImages
        );
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddJournalSection>
      {!isLoading ? (
        <>
          <StyledHeader>Write down your thoughts</StyledHeader>
          <Divider />
          <JournalInput
            name="title"
            placeholder="Enter your journal title"
            value={formValues.title}
            onChange={(event) => handleFieldChange("title", event.target.value)}
          />
          <DescSection>
            <JournalInput
              name="description"
              placeholder="Write your thoughts..."
              value={formValues.description}
              onChange={(event) =>
                handleFieldChange("description", event.target.value)
              }
            />
          </DescSection>
          <p>{errMsg}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <ImgUploadSection>
              <ImgUpload
                htmlFor="imageUpload"
                style={{ display: showAddButton ? "flex" : "none" }}
              >
                <CameraOutlined />
              </ImgUpload>
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                multiple
              />

              <ImgPreview style={{ display: "flex", flexWrap: "wrap" }}>
                {selectedFiles.map((file, index) => (
                  <ImgCont key={index}>
                    <Image
                      alt={`Uploaded Preview ${index}`}
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      src={URL.createObjectURL(file)}
                    />
                    <DelBtn onClick={() => handleDeleteImage(index)}>
                      <ImCross style={{ color: "red", fontSize: "80px" }} />
                    </DelBtn>
                  </ImgCont>
                ))}
              </ImgPreview>
            </ImgUploadSection>
            <ButtonComponent
              name={isEdit ? "Save Changes" : "Add Journal"}
              click={handleSave}
              width="300px"
              margin="0px"
            />
          </div>
        </>
      ) : (
        <Spin
          spinning={true}
          delay={500}
          size="large"
          style={{ margin: "auto", display: "flex", alignSelf: "center" }}
        />
      )}
    </AddJournalSection>
  );
}
