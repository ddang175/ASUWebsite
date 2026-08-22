export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          is_visible: boolean;
          show_in_nav: boolean;
          nav_label: string;
          nav_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      page_content: {
        Row: {
          id: string;
          page_slug: string;
          section_key: string;
          content_type: string;
          value: string;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['page_content']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['page_content']['Insert']>;
      };
      officers: {
        Row: {
          id: string;
          name: string;
          role: string;
          photo_url: string;
          photo_storage_path: string;
          country: string;
          country_label: string;
          major: string;
          hometown: string;
          year: string;
          blurb: string;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['officers']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['officers']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          start_time: string;
          end_time: string | null;
          location: string;
          description: string;
          image_url: string;
          image_storage_path: string;
          collab: string | null;
          rsvp_url: string | null;
          tags: string[];
          is_visible: boolean;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      images: {
        Row: {
          id: string;
          url: string;
          storage_path: string;
          alt_text: string;
          category: string;
          display_order: number;
          is_visible: boolean;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['images']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['images']['Insert']>;
      };
      site_settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'updated_at'> & { updated_at?: string };
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
      nav_links: {
        Row: {
          id: string;
          label: string;
          href: string;
          is_external: boolean;
          display_order: number;
          is_visible: boolean;
          parent_group: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['nav_links']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['nav_links']['Insert']>;
      };
    };
  };
}
