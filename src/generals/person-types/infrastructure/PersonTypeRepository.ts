import axios, { type AxiosResponse } from "axios";
import { API_BASE_URL } from "@/core/contants/env";
import { type PersonTypeResponse } from "../domain";

// export const findAll = async (): Promise<AxiosResponse<PersonTypeResponse[]>> =>
//   await axios.get<PersonTypeResponse[]>(
//     "https://localhost:7096/api/persontype",
//   );

export const findAll = async (): Promise<PersonTypeResponse[]> => {
  const response: AxiosResponse<PersonTypeResponse[]> = await axios.get<
    PersonTypeResponse[]
  >(`${API_BASE_URL}/api/persontype`);
  return response.data;
};

// export const findAll = async (): Promise<PersonTypeResponse[]> => {
//   const response: PersonTypeResponse[] = await fetch(
//     "https://localhost:7096/api/persontype",
//   )
//     .then(async (res) => await res.json())
//     .then((res: PersonTypeResponse[]) => res);

//   return response;
// };
