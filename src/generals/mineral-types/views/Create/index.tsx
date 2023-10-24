import { MineralTypeRequest } from "../../domain";
import useCreateMineralType from "../../application/hooks/useCreateMineralType";
import { useNavigate } from "react-router-dom";
import { FormSave } from "../components/FormSave";

const index = (): JSX.Element => {
  //Attributes
  const navigate = useNavigate();

  //   const formik = useFormik<MineralTypeRequest>({
  //     initialValues: {
  //       name: "",
  //       description: "",
  //       slug: "",
  //     },
  //     validationSchema: Yup.object({
  //       name: Yup.string().required(),
  //     }),
  //     onSubmit: (values) => {
  //       console.log(values);
  //       createMineralType(values);
  //     },
  //   });

  //React Query
  const { mutateAsync } = useCreateMineralType();

  //Method
  const createMineralType = async (
    payload: MineralTypeRequest,
  ): Promise<void> => {
    try {
      await mutateAsync(payload);
      navigate("/mineral-types");
    } catch (error) {
      console.log("Error create", error);
    }
  };

  return (
    <FormSave
      pageTitle="Registrar"
      onSave={(payload) => {
        void createMineralType(payload);
      }}
    />
  );
};

export default index;
