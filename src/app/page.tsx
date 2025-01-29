// app/page.tsx
import Converter from '@/components/Converter';
import { AdUnit } from '@/components/AdUnit';

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <AdUnit slotId="SEU_SLOT_ID_CONTENT_TOP" />
      </div>
      
      <Converter />

      <div className="mt-8">
        <AdUnit slotId="SEU_SLOT_ID_CONTENT_BOTTOM" />
      </div>
    </>
  );
}