interface GtagEventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
  
  interface GtagConfigParams {
    page_path?: string;
    send_page_view?: boolean;
    [key: string]: any;
  }
  
  interface Window {
    gtag: {
      (command: 'config', targetId: string, config?: GtagConfigParams): void;
      (command: 'event', action: string, params?: GtagEventParams): void;
      (command: 'set', params: Record<string, any>): void;
    };
    dataLayer: Record<string, any>[];
  }