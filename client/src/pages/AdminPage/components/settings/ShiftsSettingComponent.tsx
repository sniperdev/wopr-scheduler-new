import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import RemoveSettingModal from "./RemoveSettingModal.tsx";

interface Props {
  user: User;
  readyShiftsRefetch: any;
  readyShiftsMutation: any;
}

interface Shifts {
  id: number;
  name: string;
  start: string;
  end: string;
}
const ShiftsSettingComponent = ({
  user,
  readyShiftsRefetch,
  readyShiftsMutation,
}: Props) => {
  const [shifts, setShifts] = useState<Shifts[]>([]);
  const [removeModal, setRemoveModal] = useState(false);
  const [shiftId, setShiftId] = useState<number>(0);
  const [originalShifts, setOriginalShifts] = useState<Shifts[]>([]);
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
    if (data) {
      setShifts(data);
      setOriginalShifts(JSON.parse(JSON.stringify(data)));
    }
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
      setAddShift({
        name: "",
        start: "",
        end: "",
      });
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
      readyShiftsRefetch();
      readyShiftsMutation.mutate();
      refetch();
    },
  });

  const updateShiftMutation = useMutation({
    mutationFn: async (updatedShift: Shifts) => {
      const response = await axios.put(
        `http://localhost:3000/shift/${updatedShift.id}`,
        updatedShift,
        {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: () => {
      readyShiftsRefetch();
      readyShiftsMutation.mutate();
      refetch();
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const { name, value } = event.target;
    setShifts((prevShifts) => {
      const newShifts = [...prevShifts];
      const index = newShifts.findIndex((shift) => shift.id === id);
      if (index !== -1) {
        newShifts[index] = { ...newShifts[index], [name]: value };
      }
      return newShifts;
    });
  };

  const handleRemoveButtonClick = () => {
    removeShiftMutation.mutate(shiftId);
    setRemoveModal(false);
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
            {shifts.map((shift, index) => {
              const isChanged =
                JSON.stringify(shift) !== JSON.stringify(originalShifts[index]);
              return (
                <div className="row gap-2" key={shift.id}>
                  <Form.Group className="col">
                    <Form.Label>Nazwa zmiany</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={shift.name}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(event, shift.id)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Label>Godzina rozpoczęcia</Form.Label>
                    <Form.Control
                      type="time"
                      name="startTime"
                      value={shift.start}
                      className="form-control col"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="col">
                    <Form.Label>Godzina zakończenia</Form.Label>
                    <Form.Control
                      type="time"
                      name="endTime"
                      value={shift.end}
                      className="form-control col"
                      disabled
                    />
                  </Form.Group>
                  <div className="col gap-2 d-flex align-items-end">
                    <Button
                      className=""
                      variant="secondary"
                      type="button"
                      disabled={!isChanged}
                      onClick={() => updateShiftMutation.mutate(shift)}
                    >
                      <PencilSquare />
                    </Button>
                    <Button
                      onClick={() => {
                        setShiftId(shift.id);
                        setRemoveModal(true);
                      }}
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
                value={addShift.name}
              />
            </Form.Group>
            <Form.Group className="col">
              <Form.Label>Godzina rozpoczęcia</Form.Label>
              <Form.Control
                type="time"
                name="start"
                onChange={handleAddInputChange}
                value={addShift.start}
              />
            </Form.Group>
            <Form.Group className="col">
              <Form.Label>Godzina zakończenia</Form.Label>
              <Form.Control
                type="time"
                name="end"
                onChange={handleAddInputChange}
                value={addShift.end}
              />
            </Form.Group>
            <Button className="my-3" type="submit">
              Dodaj zmianę
            </Button>
          </Form>
        </Col>
      </Row>
      <RemoveSettingModal
        handleDelete={handleRemoveButtonClick}
        removeModal={removeModal}
        setRemoveModal={setRemoveModal}
        message={"Czy na pewno chcesz usunąć tę zmianę?"}
      />
    </Container>
  );
};

export default ShiftsSettingComponent;
