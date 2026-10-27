import type {Metadata} from 'next';
import {setRequestLocale} from 'next-intl/server';
import SectionPage, {sectionMetadata} from '../../../components/sections/SectionPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return sectionMetadata(locale, 'education');
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  return <SectionPage locale={locale} section="education"/>;
}
