import type { RecordModel } from "pocketbase"

export type Character = RecordModel & {
  name: string
  icon: string,
  element: string,
  weapon: string,
  rarity: number,
  standard: boolean,
  bg: string,
  portrait: string,
  expand: {
    skills: Skill[]
  }
}

export type Skill = RecordModel & {
  name: string,
  character: string,
  icons: string[],
  type: string,
  description: string,
  original_description: string,
  values: object,
  gameplay_notes: string,
  description_notes: string
}