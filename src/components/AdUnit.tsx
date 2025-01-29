'use client';

import { useEffect } from 'react';

interface AdsByGoogle {
    push?: (ad: AdConfig) => void;
    google_ad_client: string;
    enable_page_level_ads: boolean;
}

interface AdConfig {
    [key: string]: unknown;
}

declare global {
    interface Window {
        adsbygoogle?: AdsByGoogle[];
    }
}

export const AdUnit = ({ slotId }: { slotId: string }) => {
    useEffect(() => {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({
            google_ad_client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
            enable_page_level_ads: true
        });
    }, []);

    return (
        <div className="ad-container text-center">
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};