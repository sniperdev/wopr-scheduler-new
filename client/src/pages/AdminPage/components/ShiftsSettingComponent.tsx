import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

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

  const { data, isLoading, error } = useQuery<Shifts[]>({
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

  // const updateShiftMutation = useMutation(
  //   (updatedShift: Shift) =>
  //     axios.put(
  //       `http://localhost:3000/shift/${updatedShift.id}`,
  //       updatedShift,
  //       {
  //         headers: {
  //           "auth-token": `${localStorage.getItem("token")}`,
  //         },
  //       },
  //     ),
  //   {
  //     onSuccess: () => {
  //       // Po pomyślnym zaktualizowaniu zmiany, odśwież dane
  //       queryClient.invalidateQueries(["shift", shift.id]);
  //     },
  //   },
  // );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target;
    // setShift({ ...shift, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // updateShiftMutation.mutate(shift);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>Edycja zmiany</h2>
      <Form onSubmit={handleFormSubmit}>
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
            </div>
          );
        })}
        <Button type="submit" className="my-2">
          Zapisz zmiany
        </Button>
      </Form>
    </div>
  );
};

export default ShiftsSettingComponent;
