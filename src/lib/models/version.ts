import type { RecordModel } from "pocketbase"

export type GameVersion = RecordModel & {
  version: string,
  release_date: string
}