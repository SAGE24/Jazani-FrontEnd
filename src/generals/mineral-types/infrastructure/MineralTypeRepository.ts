import { RequestPagination, ResponsePagination } from "@/shared/domain";
import MineralTypeFilter from "../domain/MineralTypeFilter";
import { API_BASE_URL } from "@/core/contants/env";

import axios, { type AxiosResponse } from "axios";
import { stringify } from "qs";
import MineralTypeResponse from "../domain/MineralTypeResponse";
import { MineralTypeRequest } from "../domain";

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

export const create = async (
  payload: MineralTypeRequest,
): Promise<MineralTypeResponse> => {
  const response: AxiosResponse<MineralTypeResponse> =
    await axios.post<MineralTypeResponse>(
      `${API_BASE_URL}/api/mineraltype`,
      payload,
    );

  return response.data;
};

export const findById = async (id: number): Promise<MineralTypeResponse> => {
  const response: AxiosResponse<MineralTypeResponse> =
    await axios.get<MineralTypeResponse>(
      `${API_BASE_URL}/api/mineraltype/${id}`,
    );

  return response.data;
};

export const edit = async (
  payload: MineralTypeRequest,
  id: number,
): Promise<MineralTypeResponse> => {
  const response: AxiosResponse<MineralTypeResponse> =
    await axios.put<MineralTypeResponse>(
      `${API_BASE_URL}/api/mineraltype/${id}`,
      payload,
    );

  return response.data;
};

export const remove = async (id: number): Promise<MineralTypeResponse> => {
  const response: AxiosResponse<MineralTypeResponse> =
    await axios.delete<MineralTypeResponse>(
      `${API_BASE_URL}/api/mineraltype/${id}`,
    );

  return response.data;
};
