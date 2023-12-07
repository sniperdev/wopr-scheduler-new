import { Modal, Nav } from "react-bootstrap";
import { useState } from "react";
import CompanyInfoSettingComponent from "./CompanyInfoSettingComponent.tsx";
import ShiftsSettingComponent from "./ShiftsSettingComponent.tsx";
import UsersSettingComponent from "./UsersSettingComponent.tsx";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPanelModal = ({ showModal, setShowModal }: Props) => {
  const [activeTab, setActiveTab] = useState("companyInfo");

  const handleSettingTab = (tab: string) => setActiveTab(tab);
  const handleCloseModal = () => setShowModal(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "companyInfo":
        return <CompanyInfoSettingComponent />;
      case "shifts":
        return <ShiftsSettingComponent />;
      case "users":
        return <UsersSettingComponent />;
      default:
        return null;
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      fullscreen
    >
      <Modal.Header closeButton>
        <Modal.Title>Ustawienia</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex gap-4">
        <div className="w-25 border-end">
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleSettingTab("companyInfo")}>
              Informacje o firmie
            </Nav.Link>
            <Nav.Link onClick={() => handleSettingTab("shifts")}>
              Zmiany
            </Nav.Link>
            <Nav.Link onClick={() => handleSettingTab("users")}>
              Użytkownicy
            </Nav.Link>
          </Nav>
        </div>
        <div className="w-75">{renderTabContent()}</div>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsPanelModal;
