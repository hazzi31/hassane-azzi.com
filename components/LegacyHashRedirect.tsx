'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

// Links from the former one-page home (/fr#projects, or /#projects via the
// / → /en redirect) open the matching page. The fragment never reaches the
// server, so this runs in the browser, on the home page only. Other fragments
// (#top, #certs) are still anchors of the home page and are left alone.
// The section list comes from the server as a prop: importing i18n/sections
// here left this component out of the client reference manifest (build error
// on Next.js 15.5).
export default function LegacyHashRedirect({
  locale,
  sections,
}: {
  locale: string;
  sections: readonly string[];
}) {
  const router = useRouter();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (sections.includes(id)) {
      router.replace(`/${locale}/${id}`);
    }
  }, [locale, sections, router]);

  return null;
}
