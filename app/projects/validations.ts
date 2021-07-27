import { z } from "zod"

export const CreateProject = z.object({
  name: z.string(),
})
