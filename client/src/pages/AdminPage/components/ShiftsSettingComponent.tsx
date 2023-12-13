import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";

interface Props {
  user: User;
}

interface Shifts {
  id: number;
  name: string;
  start: string;
  end: string;
}

const ShiftsSettingComponent = ({ user }: Props) => {
  const [shifts, setShifts] = useState<Shifts[]>([]);
  const [addShift, setAddShift] = useState({
    name: "",
    start: "",
    end: "",
  });

  const { data, isLoading, error, refetch } = useQuery<Shifts[]>({
    queryKey: ["shifts", user.company_id],
    queryFn: async () => {
      return axios
        .get<Shifts[]>("http://localhost:3000/Shifts/" + user.company_id, {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data);
    },
  });

  useEffect(() => {
    if (data) setShifts(data);
  }, [data]);

  const addShiftMutation = useMutation({
    mutationFn: async (addShift: {
      name: string;
      start: string;
      end: string;
    }) => {
      const response = await axios.post(
        "http://localhost:3000/shift/" + user.company_id,
        addShift,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const removeShiftMutation = useMutation({
    mutationFn: async (shiftId: number) => {
      const response = await axios.delete(
        "http://localhost:3000/shift/" + shiftId,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    // setShift({ ...shift, [name]: value });
  };

  const handleRemoveButtonClick = (id: number) => {
    removeShiftMutation.mutate(id);
  };

  const handleAddInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddShift({ ...addShift, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addShiftMutation.mutate(addShift);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <Container fluid>
      <Row>
        <Col md={12} lg={8}>
          <h2>Edycja zmiany</h2>
          <Form>
            {shifts.map((shift) => {
              return (
                <div className="row gap-2" key={shift.id}>
                  <Form.Group className="col">
                    <Form.Label>Nazwa zmiany</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={shift.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Label>Godzina rozpoczęcia</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={shift.start}
                      onChange={handleInputChange}
                      className="form-control col"
                    />
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Label>Godzina zakończenia</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={shift.end}
                      onChange={handleInputChange}
                      className="form-control col"
                    />
                  </Form.Group>
                  <div className="col gap-2 d-flex align-items-end">
                    <Button
                      className=""
                      variant="secondary"
                      type="button"
                      disabled
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      onClick={() => handleRemoveButtonClick(shift.id)}
                      variant="danger"
                      type="button"
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              );
            })}
          </Form>
          <Form onSubmit={handleFormSubmit} className="my-4">
            <h2>Dodaj nową zmianę</h2>
            <Form.Group className="col">
              <Form.Label>Nazwa zmiany</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group className="col">
              <Form.Label>Godzina rozpoczęcia</Form.Label>
              <Form.Control
                type="time"
                name="start"
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Form.Group className="col">
              <Form.Label>Godzina zakończenia</Form.Label>
              <Form.Control
                type="time"
                name="end"
                onChange={handleAddInputChange}
              />
            </Form.Group>
            <Button className="my-3" type="submit">
              Dodaj zmianę
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShiftsSettingComponent;
