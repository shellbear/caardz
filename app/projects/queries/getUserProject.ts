import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetUserProject = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(GetUserProject),
  resolver.authorize(),
  async ({ id, name }, ctx) => {
    const project = await db.project.findFirst({
      where: {
        id,
        name,
        userId: ctx.session.userId,
      },
    })

    if (!project) throw new NotFoundError()

    return project
  }
)
