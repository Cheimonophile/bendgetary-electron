import { Type } from "@common/interfaces/models/Type";


/**
 * Props for the type display
 */
export interface TypeDisplayProps {
  type: Type;
}

/**
 * Displays a type with block formatting
 */
export function TypeDisplay({
  type
}: TypeDisplayProps) {
  return (
    <div className="flex flex-row items-center gap-1 min-w-max">
      <div className={`w-4 h-4 rounded`} style={{ backgroundColor: type.color }} />
      <div>
        {type.name}
      </div>
    </div>
  )
}