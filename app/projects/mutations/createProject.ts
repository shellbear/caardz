import { CreateProject } from "app/projects/validations"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
  resolver.zod(CreateProject),
  resolver.authorize(),
  async ({ name }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const project = await db.project.create({
      data: {
        name,
        userId: ctx.session.userId!,
      },
    })

    return project
  }
)
