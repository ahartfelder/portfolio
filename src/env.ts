import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY é obrigatória"),
    PERSONAL_EMAIL: z
      .string()
      .email("PERSONAL_EMAIL deve ser um e-mail válido"),
    UPSTASH_REDIS_REST_URL: z
      .string()
      .url("UPSTASH_REDIS_REST_URL deve ser uma URL válida"),
    UPSTASH_REDIS_REST_TOKEN: z
      .string()
      .min(1, "UPSTASH_REDIS_REST_TOKEN é obrigatório"),
  },
  client: {},
  // Garante que as variáveis existem no processo atual
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PERSONAL_EMAIL: process.env.PERSONAL_EMAIL,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  },
});
