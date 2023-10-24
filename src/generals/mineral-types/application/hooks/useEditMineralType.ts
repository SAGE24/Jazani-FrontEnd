import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { MineralTypeRequest, MineralTypeResponse } from "../../domain";
import { MineralTypeRepository } from "../../infrastructure";
import { FIND_BY_ID, PAGINATED_SEARCH } from "./QueryKeys";

interface EditMineralTypeProps {
  payload: MineralTypeRequest;
  id: number;
}

const useEditMineralType = (): UseMutationResult<
  MineralTypeResponse,
  Error,
  EditMineralTypeProps
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: EditMineralTypeProps) =>
      await MineralTypeRepository.edit(params.payload, params.id),
    onError: (error) => {
      console.error("Error: ", error);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
      void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
    },
  });
};

export default useEditMineralType;
