import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { UpdateTCCRequest } from "../../types/response/tcc";

// Simulação de requisição de atualização de TCC
async function updateTCC(id: number, data: UpdateTCCRequest) {
  // Aqui você faria a chamada real para a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default function useEditTCC() {
  const mutation = useMutation({
    mutationFn: (variables: { id: number; data: UpdateTCCRequest }) =>
      updateTCC(variables.id, variables.data),
    onSuccess: () => {
      toast.success("TCC atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar TCC.");
    },
  });

  return {
    updateTCC: (id: number, data: UpdateTCCRequest) => mutation.mutate({ id, data }),
    isLoading: mutation.isLoading,
  };
}
