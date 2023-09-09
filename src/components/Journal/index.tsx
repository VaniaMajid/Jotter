import { Carousel } from "antd";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "Firebase/config";
import { Description, JournalCard, StyledCarouselImg } from "Components/Journal/journal.style";
import journal from "Assets/journalImgPlaceholder.jpg";

interface JournalData {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  timestamp: any;
}

function Journal({ journalData }: { journalData: JournalData }) {
  const fetchImageUrls = async () => {
    const imagePromises = journalData.images.map(async (imagePath) => {
      const imageRef = ref(storage, imagePath);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    });

    return Promise.all(imagePromises);
  };

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchImageUrls().then((urls) => {
      setImageUrls(urls);
    });
  }, []);

  return (
    <Link to={`${journalData.id}`}>
      
      <JournalCard
        hoverable
        bordered={false}
        cover={imageUrls.length > 0 ? (
          <Carousel autoplay style={{ height: "max-content", width: "100%" }}>
            {imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <StyledCarouselImg src={imageUrl} />
              </div>
            ))}
          </Carousel>
        ) : (
          <StyledCarouselImg src={journal} />
        )}
      >
        <Meta
          title={journalData.title}
          description={<Description>{journalData.description}</Description>}
        />
      </JournalCard>
    </Link>
  );
}

export default Journal;
