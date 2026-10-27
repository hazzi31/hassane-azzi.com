// Sections published as standalone pages (/{locale}/{section}), in menu order.
export const sectionPages = ['about', 'expertise', 'projects', 'experience', 'education', 'contact'] as const;
export type SectionPage = (typeof sectionPages)[number];
