import z from "zod";

export const rolesForm = z.object({
  name: z.string().min(1, "Name is required"),
});
