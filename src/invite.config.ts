/**
 * Single source of truth for the Nikkah invitation.
 */
export interface InviteConfig {
  hostLine: string;
  inviteText: string;
  eventTitle: string;
  daughterLine: string;
  bride: string;
  groom: string;
  connector: string;
  dateLabel: string;
  timeLabel: string;
  eventISO: string;
  venueName: string;
  mapsUrl: string;
  quote: string;
  bismillah: string;
  dressCode: {
    title: string;
    line: string;
    detail: string;
    swatches: string[];
  };
}

export const inviteConfig: InviteConfig = {
  hostLine: "Mr. & Mrs. Asghar Bashir",
  inviteText: "invite you to the",
  eventTitle: "NIKKAH",
  daughterLine: "of beloved daughter",
  bride: "Yashfa Ali",
  groom: "Zain Saleem",
  connector: "with",
  dateLabel: "21st November, 2026",
  timeLabel: "2:00 PM",
  eventISO: "2026-11-21T14:00:00+05:00",
  venueName: "Bahira Town Gul Bahar Block, Lahore",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bahira+Town+Gul+Bahar+Block+Lahore",
  quote: "May this day mark the beginning of a lifetime together",
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  dressCode: {
    title: "Dress Code",
    line: "Eastern attire in soft, light tones",
    detail: "Blush, ivory, champagne and gentle pastels are most welcome. Kindly avoid black and deep, dark shades.",
    swatches: ["#F4D9D6", "#FBF3EA", "#E6CDB8", "#CFE0EA", "#C9D3BE", "#DCD3E6"],
  },
};
