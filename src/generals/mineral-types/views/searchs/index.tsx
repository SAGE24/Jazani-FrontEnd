import { useState } from "react";
import { type MineralTypeFilter, type MineralTypeResponse } from "../../domain";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { type FilterPage, type RequestPagination } from "@/shared/domain";
import usePaginatedSearchMineralType from "../../application/hooks/usePaginatedSearchMineralType";
import { createColumnHelper } from "@tanstack/react-table";
import TablePaginated from "@/core/components/table/TablePaginated";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useRemoveMineralType from "../../application/hooks/useRemoveMineralType";

const index = (): JSX.Element => {
  //Attributes

  const [mineralTypeFilter, setMineralTypeFilter] = useState<
    RequestPagination<MineralTypeFilter>
  >({
    page: 1,
    perPage: 10,
  });

  const formik = useFormik<MineralTypeFilter>({
    initialValues: {
      name: "",
      description: "",
      slug: "",
    },
    onSubmit: (values) => {
      console.log(values);

      setMineralTypeFilter((prev) => {
        return {
          ...prev,
          filter: {
            name: values.name,
            description: values.description,
            slug: values.slug,
          },
        };
      });
    },
  });

  // React Query
  const { data: mineralTypePaginated, isFetching } =
    usePaginatedSearchMineralType(mineralTypeFilter);

  // React Table
  const columnHelper = createColumnHelper<MineralTypeResponse>();

  const columns = [
    columnHelper.display({
      id: "acciones",
      header: () => <span className="d-block text-center">Acciones</span>,
      cell: ({ row }) => (
        <span className="d-flex align-items-center justify-content-center">
          <Link
            className="btn btn-primary btn-sm me-2"
            to={`/mineral-types/edit/${row.original.id}`}
          >
            Editar
          </Link>
          <Button
            type="button"
            variant="danger"
            className="me-2 btn-sm"
            onClick={() => {
              void removeById(row.original.id);
            }}
          >
            Eliminar
          </Button>
        </span>
      ),
    }),
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Descripcion",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("slug", {
      header: "Slug",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("registrationDate", {
      header: "Fech. Registro",
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

  // Methods
  const goToPage = (payload: FilterPage): void => {
    setMineralTypeFilter((prev) => {
      return {
        ...prev,
        page: payload.page,
        perPage: payload.perPage,
      };
    });
  };

  const { mutateAsync } = useRemoveMineralType();

  const removeById = async (id: number): Promise<void> => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     console.log("OK");
    //   }
    // });

    const selectOption = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (selectOption.isConfirmed) {
      await mutateAsync(id);
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>General</Breadcrumb.Item>
        <Breadcrumb.Item active>Tipo de Minerales</Breadcrumb.Item>
        <li className="breadcrumb-item breadcrumb-action ms-auto">
          <Link className="btn btn-success" to="/mineral-types/create">
            Nuevo
          </Link>
        </li>
      </Breadcrumb>

      <Row className="pt-2">
        <Col xs={12}>
          <Card className="mb-2">
            <Card.Header>Busqueda</Card.Header>
            <Card.Body>
              <Row>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  ></Form.Control>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <Form.Label>Slug</Form.Label>
                  <Form.Control
                    type="text"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                  ></Form.Control>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end">
              <Button
                type="button"
                variant="primary"
                className="me-2"
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                Buscar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={formik.handleReset}
              >
                Limpiar
              </Button>
            </Card.Footer>
          </Card>

          <Card>
            <Card.Header>Listado de Tipo de Minerales</Card.Header>
            <Card.Body>
              <TablePaginated<MineralTypeResponse>
                columns={columns}
                data={mineralTypePaginated}
                goToPage={goToPage}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default index;
