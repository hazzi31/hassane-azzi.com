// Title of a standalone section page: h1 styled like the former section h2.
export function SectionTitle({part1, emphasis}: {part1: string; emphasis: string}) {
  return <h1 className="section-title">{part1}<em>{emphasis}</em></h1>;
}
