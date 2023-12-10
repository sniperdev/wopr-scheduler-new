import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
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

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanyInfoSettingMutation.mutate(companyInfoRe);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyInfoRe({ ...companyInfoRe, [name]: value });
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-50">
      <h2>Informacje o firmie</h2>
      <Form onSubmit={handleInputSubmit}>
        <Form.Group>
          <Form.Label>Nazwa firmy</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            placeholder="Nazwa firmy"
            name="companyName"
            required
            value={companyInfoRe?.companyName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adres firmy</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            placeholder="Adres firmy"
            name="address"
            required
            value={companyInfoRe?.address}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            placeholder="Imie"
            name="name"
            required
            value={companyInfoRe?.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Nazwisko</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            placeholder="Nazwisko"
            name="surname"
            required
            value={companyInfoRe?.surname}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Numer Telefonu</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            type="text"
            placeholder="Numer telefonu"
            name="phone"
            required
            value={companyInfoRe?.phone}
          />
        </Form.Group>
        <Button type="submit" className="my-3">
          Zapisz zmiany
        </Button>
      </Form>
    </div>
  );
};

export default CompanyInfoSettingComponent;
