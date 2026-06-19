import { Badge } from "@/components/ui/badge"
import { getSkill } from "@/data/skills"

export function SkillChain({ skillIds }: { skillIds: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skillIds.map((id) => {
        const skill = getSkill(id)

        return (
          <Badge key={id} variant="secondary">
            {skill?.name ?? id}
          </Badge>
        )
      })}
    </div>
  )
}
