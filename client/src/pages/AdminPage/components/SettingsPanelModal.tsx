import { Modal, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import CompanyInfoSettingComponent from "./settings/CompanyInfoSettingComponent.tsx";
import ShiftsSettingComponent from "./settings/ShiftsSettingComponent.tsx";
import UsersSettingComponent from "./settings/UsersSettingComponent/UsersSettingComponent.tsx";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  readyShiftsMutation: any;
  readyShiftsRefetch: any;
}

const SettingsPanelModal = ({
  showModal,
  setShowModal,
  user,
  readyShiftsRefetch,
  readyShiftsMutation,
}: Props) => {
  const [activeTab, setActiveTab] = useState("companyInfo");

  const handleSettingTab = (tab: string) => setActiveTab(tab);
  const handleCloseModal = () => setShowModal(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "companyInfo":
        return <CompanyInfoSettingComponent user={user} />;
      case "shifts":
        return (
          <ShiftsSettingComponent
            user={user}
            readyShiftsRefetch={readyShiftsRefetch}
            readyShiftsMutation={readyShiftsMutation}
          />
        );
      case "users":
        return <UsersSettingComponent user={user} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      size="xl"
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
