export default interface PersonTypeResponse {
  id: number;
  name: string;
  description?: string;
  registrationDate: Date;
  state: boolean;
}
