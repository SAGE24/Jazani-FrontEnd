import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { login } from "@/auth/login/infrastructure/LoginRepository";
import {
  type UserSecurityResponse,
  type LoginRequest,
} from "@/auth/login/domain";

const useLogin = (): UseMutationResult<
  UserSecurityResponse,
  Error,
  LoginRequest
> => {
  return useMutation({
    mutationFn: async (payload: LoginRequest) => login(payload),
  });
};

export default useLogin;
