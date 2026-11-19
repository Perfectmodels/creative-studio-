import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'ReelPilot Studio — Studio vidéo intelligent',
  description: 'Créez et montez des Reels avec un studio vidéo piloté par Remotion et HyperFrames.'
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}</body></html>;
}
