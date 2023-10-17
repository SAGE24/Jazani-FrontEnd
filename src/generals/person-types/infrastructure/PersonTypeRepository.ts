import axios, { type AxiosResponse } from "axios";
import { type PersonTypeResponse } from "../domain";

export const findAll = async (): Promise<AxiosResponse<PersonTypeResponse[]>> =>
  await axios.get<PersonTypeResponse[]>(
    "https://localhost:7096/api/persontype",
  );
