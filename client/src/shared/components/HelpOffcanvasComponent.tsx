import { Offcanvas } from "react-bootstrap";
import ImageModal from "./ImageModal.tsx";
import { useState } from "react";

interface Props {
  showCanvas: boolean;
  setShowCanvas: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpOffcanvasComponent = ({ showCanvas, setShowCanvas }: Props) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const handleImageClick = (imgSrc: string) => {
    setImgSrc(imgSrc);
    setShowImageModal(true);
  };
  return (
    <>
      <Offcanvas
        show={showCanvas}
        onHide={() => setShowCanvas(false)}
        placement={"end"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Instrukcja obsługi aplikacji</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>1. Jak dodać zmianę do kalendarza</p>
          <img
            src="/src/assets/images/help/1.png"
            alt=""
            onClick={() => handleImageClick("/src/assets/images/help/1.png")}
            className="w-100"
          />
          <p>Klikamy w wybraną przez nas datę</p>
          <img
            src="/src/assets/images/help/2.png"
            alt=""
            onClick={() => handleImageClick("/src/assets/images/help/2.png")}
            className="w-100"
          />
          <p>Następnie wybieramy zmianę oraz klikamy w przycisk "Zapisz"</p>
          <hr />
          <p>
            Jeśli chcemy usunąć daną zmianę klikamy w wybraną zmianę następnie w
            wyskakującym oknie potwierdź
          </p>
          <img
            src="/src/assets/images/help/3.png"
            alt=""
            onClick={() => handleImageClick("/src/assets/images/help/3.png")}
            className="w-100"
          />
          <hr />
          <p>
            Jeśli chcemy się wyglodować z aplikacji klikamy w przycisk
            "Wyloguj", a następnie w przycisk "Potwierdź"
          </p>
          <img
            src="/src/assets/images/help/4.png"
            alt=""
            onClick={() => handleImageClick("/src/assets/images/help/4.png")}
            className="w-100"
          />
        </Offcanvas.Body>
      </Offcanvas>
      <ImageModal
        showImageModal={showImageModal}
        imgSrc={imgSrc}
        setShowImageModal={setShowImageModal}
      ></ImageModal>
    </>
  );
};

export default HelpOffcanvasComponent;
