import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1, { message: "A rua é obrigatória" }),
  neighborhood: z.string().min(1, { message: "O bairro é obrigatório" }),
  city: z.string().min(1, { message: "A cidade é obrigatória" }),
  state: z.string().length(2, { message: "O estado deve ter 2 letras" }),
  uf: z.string(),
  cep: z
    .string()
    .regex(/^\d{8}$/, { message: "O CEP deve ter 8 dígitos numéricos" }),
  addressNumber: z
    .string()
    .min(1, { message: "O número do endereço é obrigatório" }),
});
