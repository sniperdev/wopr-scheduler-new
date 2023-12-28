import { Modal, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import CompanyInfoSettingComponent from "./settings/CompanyInfoSettingComponent.tsx";
import ShiftsSettingComponent from "./settings/ShiftsSettingComponent.tsx";
import UsersSettingComponent from "./settings/UsersSettingComponent.tsx";
import ResetSettingComponent from "./settings/ResetSettingComponent.tsx";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const SettingsPanelModal = ({ showModal, setShowModal, user }: Props) => {
  const [activeTab, setActiveTab] = useState("companyInfo");

  const handleSettingTab = (tab: string) => setActiveTab(tab);
  const handleCloseModal = () => setShowModal(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "companyInfo":
        return <CompanyInfoSettingComponent user={user} />;
      case "shifts":
        return <ShiftsSettingComponent user={user} />;
      case "users":
        return <UsersSettingComponent user={user} />;
      case "reset":
        return <ResetSettingComponent />;
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
        <div className="">
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
            <Nav.Link onClick={() => handleSettingTab("reset")}>
              Reset ustawień serwera
            </Nav.Link>
          </Nav>
        </div>
        <div className="w-75">
          <Navbar.Toggle className="ml-auto" />
          {renderTabContent()}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsPanelModal;
