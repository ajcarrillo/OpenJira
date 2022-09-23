export type EntryStatus = "pending" | "in-progress" | "finished"

export interface Entry {
  id: string
  description: string
  createdAt: number
  status: EntryStatus
}
