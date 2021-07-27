import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetProjectByName = z.object({
  // This accepts type of undefined, but is required at runtime
  name: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetProjectByName),
  resolver.authorize(),
  async ({ name }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const project = await db.project.findFirst({ where: { name } })

    if (!project) throw new NotFoundError()

    return project
  }
)
