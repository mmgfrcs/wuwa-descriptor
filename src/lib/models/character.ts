import type { RecordModel } from "pocketbase"

export type Character = RecordModel & {
  name: string
  icon: string,
  element: string,
  weapon: string,
  rarity: number,
  standard: boolean,
  unreleased: boolean,
  bg: string,
  portrait: string,
  expand: {
    skills: Skill[],
    chains: Chains[]
  }
}

export type Skill = RecordModel & {
  name: string,
  character: string,
  icons: string[],
  type: string,
  status: string,
  description: string,
  original_description: string,
  values: object,
  gameplay_notes: string,
  description_notes: string
}

export type Chains = RecordModel & {
  name: string,
  character: string,
  status: string,
  level: number,
  icon: string,
  description: string,
  original_description: string,
  gameplay_notes: string,
  description_notes: string
}