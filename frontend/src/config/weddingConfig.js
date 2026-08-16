// ============================================================
//  WEDDING CONFIG — single source of truth for all content.
//  The family can edit dates, venues, photos, contacts, and
//  toggle optional sections here WITHOUT touching layout code.
// ============================================================

// ---- Optional section visibility (drives nav + rendering) ----
export const sectionVisibility = {
  dressCode: true,
  rsvp: false,
  contact: false,
  livestream: true,
};

export const couple = {
  groom: {
    name: "Abel Thomas Koshy",
    short: "Abel",
    parents: "Son of Rev. Fr. Koshy Thomas & Mrs. Beena Koshy",
    photo:
      "https://drive.google.com/file/d/1r8eHSpAOGOp2INiBbLmXnG0s7S-509cY/view?usp=drive_link",
  },
  bride: {
    name: "Merlyn Grace George",
    short: "Merlyn",
    parents: "Daughter of Mr. Shaji George & Mrs. Sheeja George",
    photo:
      "https://drive.google.com/file/d/16zdenBfrWL7q_8MtxHnYR1_DjBxTF3k2/view?usp=drive_link",
  },
};

export const weddingDate = {
  // Wedding / Holy Matrimony — the countdown + hero target
  iso: "2026-12-28T10:30:00+05:30",
  displayDate: "Monday, 28 December 2026",
  displayTime: "10:30 AM",
};

// ---- The Journey: three events across two days ----
export const events = [
  {
    key: "engagement",
    label: "The Betrothal",
    title: "Engagement",
    day: "Saturday",
    date: "26 December 2026",
    time: "11:30 AM",
    venue: "Mount Olive Parish Hall",
    address: "Adoor, Kerala 691551, India",
    plusCode: "4PQH+2Q Adoor, Kerala, India",
    mapsQuery: "Mount Olive Parish Hall Adoor Kerala",
    thread: "groom", // accent thread
    // calendar
    calDate: "2026-12-26",
    calStart: "20261226T113000",
    calEnd: "20261226T133000",
  },
  {
    key: "wedding",
    label: "The Crowning",
    title: "Holy Matrimony",
    day: "Monday",
    date: "28 December 2026",
    time: "10:30 AM",
    venue: "Mount Tabor Dayara",
    address: "Pathanapuram, Kerala 689695, India",
    plusCode: "3VQ4+VX Mancode, Kerala, India",
    mapsQuery: "Mount Tabor Dayara Mancode Pathanapuram Kerala",
    thread: "bride",
    calDate: "2026-12-28",
    calStart: "20261228T103000",
    calEnd: "20261228T123000",
  },
  {
    key: "reception",
    label: "The Feast",
    title: "Reception",
    day: "Monday",
    date: "28 December 2026",
    time: "Following the ceremony",
    venue: "New Mangalya Auditorium",
    address: "Kallumkadavu, Pathanapuram, Kerala 689695, India",
    plusCode: "3VV3+R8 Pathanapuram, Kerala, India",
    mapsQuery: "New Mangalya Auditorium Kallumkadavu Pathanapuram Kerala",
    thread: "bride",
    // reception shares the wedding's date/time in its calendar entry, venue changed
    calDate: "2026-12-28",
    calStart: "20261228T103000",
    calEnd: "20261228T140000",
  },
];

// ---- Scripture ----
export const hoseaVerse = {
  text: "I will betroth you to me forever; I will betroth you in righteousness and justice, in steadfast love and mercy. I will betroth you to me in faithfulness.",
  ref: "Hosea 2:19–20",
};

// Song of Solomon — split into phrases for the "Light the Lamps" reveal
export const songOfSolomon = {
  ref: "Song of Solomon 8:6–7",
  segments: [
    "Set me as a seal upon your heart,",
    "as a seal upon your arm,",
    "for love is strong as death,",
    "many waters cannot quench love,",
    "neither can floods drown it.",
  ],
};

// ---- The Crowning reveal (fixed copy — confirmed) ----
export const crowningReveal =
  "Crowned in grace and joy — Abel & Merlyn joyfully invite you to share in the celebration of their holy union.";

// ---- Dress code (isolated colour config; animations reference these) ----
export const dressCodeSwatches = {
  groomSide: {
    label: "The Groom's House",
    note: "Gold · Cream · Off-white · Rose-Lavender",
    colors: ["#C9A15D", "#FBF3E7", "#EFE4CF", "#D9A9C4", "#C9B6DA"],
  },
  brideSide: {
    label: "The Bride's House",
    note: "Teal · Turquoise · Royal Blue",
    colors: ["#0E5C57", "#1B6E6A", "#2FA6A0", "#264D73", "#1C3A5E"],
  },
};

// ---- Gallery (swap URLs freely; add more entries anytime) ----
export const galleryImages = [
  "https://drive.google.com/file/d/16zdenBfrWL7q_8MtxHnYR1_DjBxTF3k2/view?usp=drive_link",
  "https://drive.google.com/file/d/1r8eHSpAOGOp2INiBbLmXnG0s7S-509cY/view?usp=drive_link",
];

// ---- Jigsaw source (fixed, landscape ~4:3, centred subject) ----
export const jigsawImage =
  "https://images.unsplash.com/photo-1778184425021-fd081a57a374?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

// ---- Contact (placeholder numbers — swap later) ----
export const contacts = [
  { name: "RSVP & Queries", phone: "+91 90000 00000" },
  { name: "Family Desk", phone: "+91 90000 00001" },
];

// ---- Livestream (link added closer to the date) ----
export const livestream = {
  url: "", // empty => shows placeholder state
  note: "Livestream link will be added closer to the date.",
};

// ---- Closing credits ----
export const credits = {
  note: "With best compliments from",
  people: [
    { name: "Joel Koshy", relation: "brother of the groom" },
    { name: "Steve S George", relation: "brother of the bride" },
  ],
};

// ---- Mural backgrounds (per-section texture, low opacity) ----
export const muralBackgrounds = {
  a: "https://images.unsplash.com/photo-1723788217239-53b8a75a2168?crop=entropy&cs=srgb&fm=jpg&q=80&w=1600",
  b: "https://images.unsplash.com/photo-1599761291648-9edbffa710cf?crop=entropy&cs=srgb&fm=jpg&q=80&w=1600",
};

// ---- Nav (generated from visibility config; no dead links) ----
export const buildNavLinks = () => {
  const links = [{ id: "couple", label: "Couple" }, { id: "journey", label: "Journey" }];
  links.push({ id: "gallery", label: "Gallery" });
  if (sectionVisibility.rsvp) links.push({ id: "rsvp", label: "RSVP" });
  links.push({ id: "guestbook", label: "Blessings" });
  if (sectionVisibility.contact) links.push({ id: "contact", label: "Contact" });
  return links;
};

// Google Calendar quick-add URL builder
export const googleCalUrl = (ev) => {
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(`${couple.groom.short} & ${couple.bride.short} — ${ev.title}`);
  const dates = `${ev.calStart}/${ev.calEnd}`;
  const location = encodeURIComponent(`${ev.venue}, ${ev.address}`);
  const details = encodeURIComponent(
    `${ev.title} of Abel & Merlyn. ${ev.day}, ${ev.date} at ${ev.time}.`
  );
  return `${base}&text=${title}&dates=${dates}&location=${location}&details=${details}`;
};

// Build .ics file content for a single event
export const buildIcs = (ev) => {
  const uid = `${ev.key}-abelmerlyn@wedding`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abel & Merlyn Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Asia/Kolkata:${ev.calStart}`,
    `DTEND;TZID=Asia/Kolkata:${ev.calEnd}`,
    `SUMMARY:Abel & Merlyn — ${ev.title}`,
    `LOCATION:${ev.venue}\\, ${ev.address}`,
    `DESCRIPTION:${ev.title} of Abel & Merlyn. ${ev.day}\\, ${ev.date} at ${ev.time}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};

export const mapsUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
