import { z } from "zod";

export const pacienteSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  cpf: z
    .string()
    .min(1, { message: "O CPF é obrigatório" })
    .refine(
      (val) => {
        return /^\d{11}$/.test(val);
      },
      { message: "O CPF deve conter exatamente 11 dígitos" }
    ),
  email: z.string().email({ message: "O e-mail deve ser válido" }).optional(),
  phone: z.string().regex(/^\d{10,11}$/, {
    message: "O telefone deve ter 10 ou 11 dígitos",
  }),
  logradouro: z.string().min(1, { message: "A rua é obrigatória" }),
  cidade: z.string().min(1, { message: "A cidade é obrigatória" }),
  estado: z.string().length(2, { message: "O estado deve ter 2 letras" }),
  cep: z
    .string()
    .regex(/^\d{8}$/, { message: "O CEP deve ter 8 dígitos numéricos" }),
  bairro: z.string().min(1, { message: "O bairro é obrigatório" }),
  addressNumber: z
    .string()
    .min(1, { message: "O número do endereço é obrigatório" }),
  uf: z.string(),
  complemento: z.string(),
});
