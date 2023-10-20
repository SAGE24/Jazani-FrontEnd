import { RequestPagination, ResponsePagination } from "@/shared/domain";
import MineralTypeFilter from "../domain/MineralTypeFilter";
import { API_BASE_URL } from "@/core/contants/env";

import axios, { type AxiosResponse } from "axios";
import { stringify } from "qs";
import MineralTypeResponse from "../domain/MineralTypeResponse";

export const findAll = async (): Promise<MineralTypeResponse[]> => {
  const response: AxiosResponse<MineralTypeResponse[]> = await axios.get<
    MineralTypeResponse[]
  >(`${API_BASE_URL}/api/mineraltype`);

  return response.data;
};

export const paginatedSearch = async (
  payload: RequestPagination<MineralTypeFilter>,
): Promise<ResponsePagination<MineralTypeResponse>> => {
  const queryParams: string = stringify(payload, { allowDots: true });

  const response: AxiosResponse<ResponsePagination<MineralTypeResponse>> =
    await axios.get<ResponsePagination<MineralTypeResponse>>(
      `${API_BASE_URL}/api/mineraltype/paginatedsearch?${queryParams}`,
    );

  return response.data;
};
