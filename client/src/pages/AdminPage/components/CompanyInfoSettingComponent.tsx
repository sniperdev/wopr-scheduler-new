import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "react-bootstrap";

interface CompanyInfo {
  companyName: string;
  address: string;
  name: string;
  surname: string;
  phone: string;
}

interface Props {
  user: User;
}

const CompanyInfoSettingComponent = ({ user }: Props) => {
  const {
    data: companyInfo,
    isLoading,
    error,
  } = useQuery<CompanyInfo>({
    queryKey: ["companyInfo"],
    queryFn: async () => {
      return axios
        .get<CompanyInfo>(
          "http://localhost:3000/companyInfo/" + user.company_id,
          {
            headers: {
              "auth-token": `${localStorage.getItem("token")}`,
            },
          },
        )
        .then((res) => res.data);
    },
  });

  const handleInputChange = () => {};
  const handleInputSubmit = () => {};

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-25">
      <h2>Informacje o firmie</h2>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Nazwa firmy"
          name="company"
          required
          value={companyInfo?.companyName}
        />
      </div>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control my-1"
          placeholder="Adres firmy"
          name="address"
          required
          value={companyInfo?.address}
        />
      </div>
      <div className="col">
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control my-1"
          placeholder="Imie"
          name="name"
          required
          value={companyInfo?.name}
        />
      </div>
      <div className="col">
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control my-1"
          placeholder="Nazwisko"
          name="surname"
          required
          value={companyInfo?.surname}
        />
      </div>
      <div>
        <input
          onChange={handleInputChange}
          type="text"
          className="form-control my-1"
          placeholder="Numer telefonu"
          name="phone"
          required
          value={companyInfo?.phone}
        />
      </div>
      <Button onClick={handleInputSubmit}>Zapisz zmiany</Button>
    </div>
  );
};

export default CompanyInfoSettingComponent;
