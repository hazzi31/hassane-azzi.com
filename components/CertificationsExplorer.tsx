'use client';

import {useEffect, useMemo, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
// Type-only import: the data module (with its internal review notes) is never
// bundled for the browser. The server passes display-ready items instead.
import type {CertDomain} from '../data/certifications';

export type CertView = {
  id: string;
  title: string;
  titleLang: 'en' | 'fr';
  issuer?: string;
  platform?: string;
  domains: CertDomain[];
  url?: string;
  linkLabel: string;
  dateLabel?: string;
  dateTime?: string;
  skills: string[];
  skillsLang: 'en' | 'fr';
};

export type ExplorerLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  all: string;
  resultsNone: string;
  resultsOne: string;
  resultsOther: string;
  noResults: string;
  reset: string;
  via: string;
  domainsLabel: string;
  skillsLabel: string;
  moreSkillsAria: string;
  newTab: string;
};

const VISIBLE_SKILLS = 5;

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export default function CertificationsExplorer({
  certs,
  domainOrder,
  domainAliases,
  domainLabels,
  labels,
  locale,
}: {
  certs: CertView[];
  domainOrder: CertDomain[];
  /** Former domain ids mapped to their current domain. */
  domainAliases: Record<string, CertDomain>;
  domainLabels: Record<CertDomain, string>;
  labels: ExplorerLabels;
  locale: string;
}) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState<CertDomain | 'all'>('all');
  const [urlRead, setUrlRead] = useState(false);

  // Restore ?domain= and ?q= (e.g. links from the home page preview).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('domain');
    const d = param && Object.hasOwn(domainAliases, param) ? domainAliases[param] : param;
    if (d && (domainOrder as string[]).includes(d)) setDomain(d as CertDomain);
    const q = params.get('q');
    if (q) setQuery(q);
    setUrlRead(true);
  }, [domainOrder, domainAliases]);

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    if (!urlRead) return;
    const params = new URLSearchParams(window.location.search);
    if (domain === 'all') params.delete('domain');
    else params.set('domain', domain);
    if (query.trim()) params.set('q', query.trim());
    else params.delete('q');
    const search = params.toString();
    const url = `${window.location.pathname}${search ? `?${search}` : ''}`;
    window.history.replaceState(null, '', url);
  }, [domain, query, urlRead]);

  const index = useMemo(
    () =>
      certs.map((c) => ({
        cert: c,
        haystack: normalize([c.title, c.issuer ?? '', c.platform ?? '', ...c.skills].join(' ')),
      })),
    [certs],
  );

  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const matchesQuery = (haystack: string) => terms.every((term) => haystack.includes(term));
  const queryMatches = index.filter((i) => matchesQuery(i.haystack)).map((i) => i.cert);
  const results = domain === 'all' ? queryMatches : queryMatches.filter((c) => c.domains.includes(domain));

  const domainCounts = Object.fromEntries(
    domainOrder.map((d) => [d, queryMatches.filter((c) => c.domains.includes(d)).length]),
  ) as Record<CertDomain, number>;

  const resultsText =
    results.length === 0
      ? labels.resultsNone
      : (results.length === 1 ? labels.resultsOne : labels.resultsOther).replace('{count}', String(results.length));

  // "All": grouped by primary domain, catalogue order. A domain filter: flat list
  // including certificates for which it is a secondary domain.
  const groups: {domain: CertDomain | null; items: CertView[]}[] =
    domain === 'all'
      ? domainOrder
          .map((d) => ({domain: d, items: results.filter((c) => c.domains[0] === d)}))
          .filter((g) => g.items.length > 0)
      : [{domain: null, items: results}];

  return (
    <div className="certs-explorer">
      <div className="certs-controls">
        <div className="certs-search">
          <label htmlFor="certs-search-input">{labels.searchLabel}</label>
          <input
            id="certs-search-input"
            type="search"
            value={query}
            placeholder={labels.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="certs-filters" role="group" aria-label={labels.filterLabel}>
          <button
            type="button"
            aria-pressed={domain === 'all'}
            onClick={() => setDomain('all')}
          >
            {labels.all} <span className="certs-filter-count">{queryMatches.length}</span>
          </button>
          {domainOrder.map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={domain === d}
              onClick={() => setDomain(d)}
            >
              {domainLabels[d]} <span className="certs-filter-count">{domainCounts[d]}</span>
            </button>
          ))}
        </div>

        <p className="certs-results" aria-live="polite">{resultsText}</p>
      </div>

      {results.length === 0 ? (
        <div className="certs-empty">
          <p>{labels.noResults}</p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setQuery('');
              setDomain('all');
            }}
          >
            {labels.reset}
          </button>
        </div>
      ) : (
        groups.map((group) => (
          <section
            key={group.domain ?? 'filtered'}
            className="certs-category"
            aria-label={group.domain ? domainLabels[group.domain] : undefined}
          >
            {group.domain && (
              <h2 className="certs-category-title">
                {domainLabels[group.domain]} <span>({group.items.length})</span>
              </h2>
            )}
            <ul className="certs-grid">
              {group.items.map((c) => (
                <CertCard
                  key={c.id}
                  cert={c}
                  locale={locale}
                  labels={labels}
                  domainLabels={domainLabels}
                />
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

function CertCard({
  cert,
  locale,
  labels,
  domainLabels,
}: {
  cert: CertView;
  locale: string;
  labels: ExplorerLabels;
  domainLabels: Record<CertDomain, string>;
}) {
  const lang = cert.titleLang !== locale ? cert.titleLang : undefined;
  const skillsLang = cert.skillsLang !== locale ? cert.skillsLang : undefined;
  const visible = cert.skills.slice(0, VISIBLE_SKILLS);
  const hidden = cert.skills.slice(VISIBLE_SKILLS);

  return (
    <li className="cert-card">
      <h3 lang={lang}>{cert.title}</h3>

      {(cert.issuer || cert.platform) && (
        <p className="cert-org">
          {cert.issuer}
          {cert.issuer && cert.platform && ' · '}
          {cert.platform && `${labels.via} ${cert.platform}`}
        </p>
      )}

      {cert.dateLabel && (
        <p className="cert-date">
          <time dateTime={cert.dateTime}>{cert.dateLabel}</time>
        </p>
      )}

      <ul className="cert-domains" aria-label={labels.domainsLabel}>
        {cert.domains.map((d) => (
          <li key={d}>{domainLabels[d]}</li>
        ))}
      </ul>

      {cert.skills.length > 0 && (
        <div className="cert-skills" lang={skillsLang}>
          <ul aria-label={labels.skillsLabel}>
            {visible.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {hidden.length > 0 && (
            <details>
              <summary>
                +{hidden.length}
                <span className="sr-only"> {labels.moreSkillsAria}</span>
              </summary>
              <ul>
                {hidden.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {cert.url && (
        <a className="cert-link" href={cert.url} target="_blank" rel="noopener noreferrer">
          {cert.linkLabel} <ArrowUpRight size={13} aria-hidden="true"/>
          <span className="sr-only"> ({labels.newTab})</span>
        </a>
      )}
    </li>
  );
}
