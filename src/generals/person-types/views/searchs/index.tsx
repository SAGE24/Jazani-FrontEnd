import { useState, useEffect } from "react";

import { PersonTypeRepository } from "../../infrastructure";
import { type PersonTypeResponse } from "../../domain";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { TableSimple } from "@/core/components/table";
import { createColumnHelper } from "@tanstack/react-table";

const index = (): JSX.Element => {
  const [personTypes, mineralTypesSet] = useState<PersonTypeResponse[]>([]);

  useEffect(() => {
    void loadPersonalTypes();
  }, []);

  const loadPersonalTypes = async (): Promise<void> => {
    const response = await PersonTypeRepository.findAll();

    mineralTypesSet(response);
    console.log("response: ", response);
  };

  //React table
  const columnHelper = createColumnHelper<PersonTypeResponse>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Descripción",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("state", {
      header: "Estado",
      cell: ({ row }) => (
        <div className="text-center">
          <Badge pill bg={row.original.state ? "success" : "danger"}>
            {row.original.state ? "Activo" : "Elminado"}
          </Badge>
        </div>
      ),
    }),
  ];

  return (
    <>
      <Row className="pt-2">
        <Col xs={12}>
          <Card>
            <Card.Header>Listado de Tipo de Persona</Card.Header>
            <Card.Body>
              {/* <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {personTypes.length > 0 &&
                    personTypes.map((personType) => (
                      <tr key={personType.id}>
                        <td>{personType.id}</td>
                        <td>{personType.name}</td>
                        <td>{personType.description}</td>
                        <td>
                          <Badge
                            pill
                            bg={personType.state ? "success" : "danger"}
                          >
                            {personType.state ? "Activo" : "Elminado"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table> */}

              <TableSimple<PersonTypeResponse>
                columns={columns}
                data={personTypes ?? []}
              ></TableSimple>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
