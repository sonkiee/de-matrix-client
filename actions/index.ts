import { actionClient } from "@/lib/safe-action";
import { signinSchema } from "@/schema";
import { api } from "@/services/axios";

export const signin = actionClient
  .inputSchema(signinSchema)
  .action(async ({ parsedInput }) => {
    const response = await api.post("/auth/signin", parsedInput);
    return response;
  });
