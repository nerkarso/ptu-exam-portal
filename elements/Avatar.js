import cx from 'classnames';
import { useState } from 'react';

export default function Avatar({ className, src, ...props }) {
  const [error, setError] = useState(false);

  return (
    <div className={cx('relative flex-shrink-0 overflow-hidden rounded-full', className)}>
      {!src || error ? (
        <Anonymous />
      ) : (
        <img
          src={src}
          className="absolute inset-0 object-cover w-full h-full"
          onError={() => setError(true)}
          {...props}
        />
      )}
    </div>
  );
}

function Anonymous() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="currentColor" className="opacity-20" />
      <circle cx="256" cy="178" r="98" fill="currentColor" />
      <circle cx="256" cy="525" r="225" fill="currentColor" />
    </svg>
  );
}
