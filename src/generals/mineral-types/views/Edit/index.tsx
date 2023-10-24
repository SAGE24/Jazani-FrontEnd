import { useNavigate, useParams } from "react-router-dom";
import { MineralTypeRequest } from "../../domain";
import { FormSave } from "../components/FormSave";
import useEditMineralType from "../../application/hooks/useEditMineralType";

export const index = (): JSX.Element => {
  //Attributes
  const navigate = useNavigate();
  const { id } = useParams();

  const editMineralType = async (
    payload: MineralTypeRequest,
  ): Promise<void> => {
    try {
      await mutateAsync({ payload, id: Number(id) });
      navigate("/mineral-types");
    } catch (error) {
      console.log("Error create", error);
    }
  };

  //React Query
  const { mutateAsync } = useEditMineralType();

  return (
    <FormSave
      id={Number(id)}
      pageTitle="Editar"
      onSave={(payload) => {
        void editMineralType(payload);
      }}
    />
  );
};

export default index;
