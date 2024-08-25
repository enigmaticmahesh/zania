import { KeyboardEvent, useEffect, useState } from 'react';
import { Doc } from '../../utils/types';

const OverlayImage = ({ overlayImg }: { overlayImg: string }) => {
  return (
    <div className="overlay-container">
      <div>
        <img src={overlayImg} alt="overlay_image" />
      </div>
    </div>
  );
};

const DocOverlay = () => {
  const [overlayImg, setOverlayImg] = useState<string>('');
  useEffect(() => {
    const handleOverlay = (e: CustomEvent<any>) => {
      const { doc }: { doc: Doc } = e.detail;
      if (doc.thumbnail) {
        setOverlayImg(doc.thumbnail);
      }
    };

    const handleCloseOverlay = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOverlayImg('');
      }
    };

    document.addEventListener('SHOW_OVERLAY', handleOverlay as EventListener);
    document.addEventListener('keydown', handleCloseOverlay as any);

    return () => {
      document.removeEventListener(
        'SHOW_OVERLAY',
        handleOverlay as EventListener
      );
      document.removeEventListener('keydown', handleCloseOverlay as any);
    };
  }, []);

  if (!overlayImg) {
    return;
  }

  const imageUI = overlayImg && <OverlayImage overlayImg={overlayImg} />;

  return <>{imageUI}</>;
};

export default DocOverlay;
