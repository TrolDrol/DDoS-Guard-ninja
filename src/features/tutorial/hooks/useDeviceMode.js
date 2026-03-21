import { useEffect, useState } from 'react';

function detectMobile() {
  if (typeof window === 'undefined') return false;

  const coarse = window.matchMedia?.('(hover: none) and (pointer: coarse)')?.matches;
  return Boolean(coarse || window.innerWidth <= 768);
}

export function useDeviceMode() {
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    const update = () => setIsMobile(detectMobile());
    update();

    const media = window.matchMedia?.('(hover: none) and (pointer: coarse)');
    media?.addEventListener?.('change', update);
    window.addEventListener('resize', update);

    return () => {
      media?.removeEventListener?.('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return {
    isMobile,
    deviceLabel: isMobile ? 'телефона' : 'десктопа',
  };
}
