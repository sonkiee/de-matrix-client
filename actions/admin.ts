import { actionClient } from "@/lib/safe-action";
import { createProductSchema } from "@/schema";
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
