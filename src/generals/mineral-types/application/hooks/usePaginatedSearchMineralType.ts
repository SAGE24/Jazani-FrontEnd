import { ResponsePagination, type RequestPagination } from "@/shared/domain";
import { DefinedUseQueryResult, useQuery } from "@tanstack/react-query";
import { MineralTypeResponse, type MineralTypeFilter } from "../../domain";
import { PAGINATED_SEARCH } from "./QueryKeys";
import { MineralTypeRepository } from "../../infrastructure";

const usePaginateSearchMineralType = (
  searchFilter: RequestPagination<MineralTypeFilter>,
): DefinedUseQueryResult<ResponsePagination<MineralTypeResponse>, Error> => {
  return useQuery({
    queryKey: [PAGINATED_SEARCH, searchFilter],
    queryFn: async () => MineralTypeRepository.paginatedSearch(searchFilter),
    retry: 0,
    refetchOnWindowFocus: false,
    initialData: {
      from: 0,
      to: 0,
      perPage: 0,
      currentPage: 0,
      lastPage: 0,
      total: 0,
      data: [],
    },
  });
};

export default usePaginateSearchMineralType;
