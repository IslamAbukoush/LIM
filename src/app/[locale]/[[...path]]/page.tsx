import { notFound } from 'next/navigation';
import { programmes, stories, reports } from '@/content/site';
import { translate, type Locale } from '@/i18n/config';
import Page0 from '@/app/page';
import Page1 from '@/app/about/page';
import Page2 from '@/app/programmes/page';
import Page3 from '@/app/news/page';
import Page4 from '@/app/advocacy/page';
import Page5 from '@/app/mosque-project/page';
import Page6 from '@/app/get-involved/page';
import Page7 from '@/app/report-discrimination/page';
import Page8 from '@/app/privacy/page';
import Programme from '@/app/programmes/[slug]/page';
import Article from '@/app/news/[slug]/page';
import Report from '@/app/reports/[slug]/page';
const paths = ["","about","programmes","news","advocacy","mosque-project","get-involved","report-discrimination","privacy"];
const routeTitles = ['Islamic League of Moldova','About the League','Programmes & services','News','Advocacy','National Mosque Project','Get involved','Report discrimination','Privacy & prototype terms'];
export const dynamicParams = false;
export function generateStaticParams() { return ['ro','ru'].flatMap(locale => [...paths, ...programmes.map(p=>'programmes/'+p.slug), ...stories.map(p=>'news/'+p.slug), ...reports.map(p=>'reports/'+p.slug)].map(path=>({locale,path:path?path.split('/'):[]}))); }
type Props = { params: Promise<{locale: string; path?: string[]}> };
export async function generateMetadata({params}:Props) { const {locale,path=[]}=await params; const route=path.join('/'); const item=[...programmes,...stories,...reports].find(p=>p.slug===path[1]);const title=routeTitles[paths.indexOf(route)] || item?.title || 'Islamic League of Moldova'; const lang=locale as Locale; return {title:{absolute:translate(title,lang)+' | '+translate('Islamic League of Moldova',lang)}, description:translate('Explore the Islamic League of Moldova website design prototype: community, advocacy and ways to get involved.',lang),alternates:{languages:{en:'/'+route,ro:'/ro/'+route,ru:'/ru/'+route}},openGraph:{locale:lang==='ro'?'ro_MD':'ru_MD',title:translate(title,lang),description:translate('Faith. Dignity. Belonging. A website design prototype.',lang)}}; }
export default async function LocalizedPage({params}:Props) {const {locale,path=[]}=await params;if(!['ro','ru'].includes(locale))notFound();const route=path.join('/'); const pages=[Page0,Page1,Page2,Page3,Page4,Page5,Page6,Page7,Page8];const Page=pages[paths.indexOf(route)];if(Page)return <Page/>; const detail={params:Promise.resolve({slug:path[1]})};if(path.length===2){if(path[0]==='programmes')return <Programme {...detail}/>;if(path[0]==='news')return <Article {...detail}/>;if(path[0]==='reports')return <Report {...detail}/>;}notFound();}
