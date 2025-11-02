export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
      cart_items: {
        Row: {
          cart_id: number
          created_at: string
          id: number
          menu_id: number
          quantity: number
        }
        Insert: {
          cart_id: number
          created_at?: string
          id?: number
          menu_id: number
          quantity: number
        }
        Update: {
          cart_id?: number
          created_at?: string
          id?: number
          menu_id?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: number
          restaurant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          restaurant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          restaurant_id?: string
          user_id?: string
        }
        Relationships: []
      }
      menus: {
        Row: {
          category: string
          genre: string
          id: number
          image_path: string
          is_featured: boolean
          name: string
          price: number
        }
        Insert: {
          category: string
          genre: string
          id?: number
          image_path: string
          is_featured: boolean
          name: string
          price: number
        }
        Update: {
          category?: string
          genre?: string
          id?: number
          image_path?: string
          is_featured?: boolean
          name?: string
          price?: number
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          image_path: string
          menu_id: number
          name: string
          order_id: number
          price: number
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          image_path: string
          menu_id: number
          name: string
          order_id: number
          price: number
          quantity: number
        }
        Update: {
          created_at?: string
          id?: number
          image_path?: string
          menu_id?: number
          name?: string
          order_id?: number
          price?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery: number
          fee: number
          id: number
          restaurant_id: string
          service: number
          subtotal_price: number
          total_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery: number
          fee: number
          id?: number
          restaurant_id: string
          service: number
          subtotal_price: number
          total_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          delivery?: number
          fee?: number
          id?: number
          restaurant_id?: string
          service?: number
          subtotal_price?: number
          total_price?: number
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          selected_address_id: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          selected_address_id?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          selected_address_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_selected_address_id_fkey"
            columns: ["selected_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}