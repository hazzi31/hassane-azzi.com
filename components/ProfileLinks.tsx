import type {LucideIcon} from 'lucide-react';
import {
  Briefcase,
  Github,
  GraduationCap,
  Linkedin,
  MessageSquareCode,
  Microscope,
  Youtube,
} from 'lucide-react';

// Professional and scientific profiles. URLs verified against the English home
// page of www.hassane-azzi.fr (2026-10-19): keep them identical to that page.
export const profiles: {label: string; href: string; Icon: LucideIcon}[] = [
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/hassane-azzi-312a8024/', Icon: Linkedin},
  {label: 'GitHub', href: 'https://github.com/hazzi31', Icon: Github},
  {label: 'Malt', href: 'https://www.malt.fr/profile/hassaneazzi', Icon: Briefcase},
  {label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Hassane-Azzi', Icon: Microscope},
  {label: 'ENAC Alumni', href: 'https://www.alumni.enac.fr/fr/profil/hassane.azzi', Icon: GraduationCap},
  {label: 'YouTube', href: 'https://www.youtube.com/@hassane-azzi/playlists', Icon: Youtube},
  {label: 'Stack Overflow', href: 'https://stackoverflow.com/users/11009814/hassane-azzi', Icon: MessageSquareCode},
];

export default function ProfileLinks() {
  return (
    <>
      {profiles.map(({label, href, Icon}) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          <Icon size={18} aria-hidden="true"/> {label}
        </a>
      ))}
    </>
  );
}
