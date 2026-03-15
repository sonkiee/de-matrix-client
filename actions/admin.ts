import { actionClient } from "@/lib/safe-action";
import { createProductSchema } from "@/schema";
import { api } from "@/services/axios";

export const createProduct = actionClient
  .inputSchema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/products", parsedInput);
    return response;
  });
