import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { MineralTypeRequest, MineralTypeResponse } from "../../domain";
import { MineralTypeRepository } from "../../infrastructure";
import { FIND_BY_ID, PAGINATED_SEARCH } from "./QueryKeys";

const useCreateMineralType = (): UseMutationResult<
  MineralTypeResponse,
  Error,
  MineralTypeRequest
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MineralTypeRequest) =>
      await MineralTypeRepository.create(payload),
    onError: (error) => {
      console.error("Error: ", error);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [PAGINATED_SEARCH] });
      void queryClient.invalidateQueries({ queryKey: [FIND_BY_ID] });
    },
  });
};

export default useCreateMineralType;
