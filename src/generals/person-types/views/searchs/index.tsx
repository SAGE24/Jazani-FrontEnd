import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import { PersonTypeRepository } from "../../infrastructure";
import { type PersonTypeResponse } from "../../domain";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

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

  return (
    <>
      <Row className="pt-2">
        <Col xs={12}>
          <Card>
            <Card.Header>Listado de Tipo de Persona</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
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
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
