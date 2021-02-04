import Spinner from '@/elements/Spinner';
import { useEffect, useRef, useState } from 'react';

export default function WebViewer({ url }) {
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.onload = (e) => setLoading(false);
    }
  }, [url]);

  return (
    <div className="relative h-full">
      {loading && (
        <div className="absolute inset-0 grid w-full h-full bg-white place-items-center dark:bg-invert-900">
          <Spinner className="w-8 h-8 text-primary-600 dark:text-primary-500" />
        </div>
      )}
      <iframe src={url} className="w-full h-full border-0 dark:filter-invert" ref={ref} />
    </div>
  );
}
