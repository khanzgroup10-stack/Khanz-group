import './globals.css';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'CNI — Our Divisions',description:'Crescent Nova International — eight divisions and one connected platform.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
