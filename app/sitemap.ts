import {MetadataRoute} from 'next';

const BASE = 'https://www.hassane-azzi.com';

// Fixed date — update when content changes significantly
const LAST_MODIFIED = new Date('2026-09-20');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/en`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/fr`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/de`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
