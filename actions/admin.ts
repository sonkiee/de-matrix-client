import { actionClient } from "@/lib/safe-action";
import { createProductSchema, inviteAdminSchema } from "@/schema";
import { api } from "@/lib/axios";

export const createProduct = actionClient
  .inputSchema(createProductSchema)
  .action(async ({ parsedInput }) => {
    const formData = new FormData();

    const { files, ...rest } = parsedInput;

    formData.append("data", JSON.stringify(rest));

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  });

export const inviteAdmin = actionClient
  .inputSchema(inviteAdminSchema)
  .action(async ({ parsedInput: { email } }) => {
    const response = await api.post("/admin/promote", { email });
    return response.data;
  });
