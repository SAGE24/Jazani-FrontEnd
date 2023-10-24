import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { FIND_BY_ID } from "./QueryKeys";
import { MineralTypeRepository } from "../../infrastructure";
import { MineralTypeResponse } from "../../domain";

export const useFindByIdMineralType = (
  id?: number,
): UseQueryResult<MineralTypeResponse, Error> => {
  return useQuery({
    queryKey: [FIND_BY_ID, id],
    queryFn: async () => await MineralTypeRepository.findById(id ?? 0),
    enabled: id != null,
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
