import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

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
  const [companyInfoRe, setCompanyInfoRe] = useState<CompanyInfo>({
    address: "",
    companyName: "",
    name: "",
    phone: "",
    surname: "",
  });

  const {
    data: companyInfo,
    isLoading,
    error,
  } = useQuery<CompanyInfo>({
    queryKey: ["companyInfo", user.company_id],
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

  const saveCompanyInfoSettingMutation = useMutation({
    mutationFn: async (companyInfoRe: CompanyInfo) => {
      const response = await axios.put(
        "http://localhost:3000/companyInfo/" + user.company_id,
        companyInfoRe,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (companyInfo) setCompanyInfoRe(companyInfo);
  }, [companyInfo]);

  const handleInputSubmit = () => {
    saveCompanyInfoSettingMutation.mutate(companyInfoRe);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfoRe({ ...companyInfoRe, [name]: value });
  };

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
          value={companyInfoRe?.companyName}
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
          value={companyInfoRe?.address}
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
          value={companyInfoRe?.name}
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
          value={companyInfoRe?.surname}
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
          value={companyInfoRe?.phone}
        />
      </div>
      <Button onClick={handleInputSubmit}>Zapisz zmiany</Button>
    </div>
  );
};

export default CompanyInfoSettingComponent;
