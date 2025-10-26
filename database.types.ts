export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address_text: string
          created_at: string
          id: number
          latitude: number
          longitude: number
          name: string
          user_id: string
        }
        Insert: {
          address_text: string
          created_at?: string
          id?: number
          latitude: number
          longitude: number
          name: string
          user_id: string
        }
        Update: {
          address_text?: string
          created_at?: string
          id?: number
          latitude?: number
          longitude?: number
          name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
  }
}