export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Track page views
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID) return;
  (window as any).gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (!GA_MEASUREMENT_ID) return;
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
