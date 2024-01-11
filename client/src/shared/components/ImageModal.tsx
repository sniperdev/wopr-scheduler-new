import { Button, Modal } from "react-bootstrap";

interface Props {
  showImageModal: boolean;
  imgSrc: string;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageModal = ({ showImageModal, imgSrc, setShowImageModal }: Props) => {
  return (
    <Modal show={showImageModal} size="lg" centered className="w-75">
      <Modal.Body>
        <img src={imgSrc} alt="" className="w-100" />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowImageModal(false)}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
