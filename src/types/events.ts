/**
 * EventData type definition for event content used across the site.
 */

export interface EventData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  imageUrl: string;
  collab: string | null;
  rsvpUrl: string | null;
  tags: string[];
}
