import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (_, ctx) => {
  await db.user.delete({
    where: {
      id: ctx.session.userId!,
    },
  })

  return await ctx.session.$revoke()
})
