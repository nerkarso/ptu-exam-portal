import { useEffect } from 'react';

export default function FeedbackWidget() {
  useEffect(() => {
    /**
     * @url https://www.feedbase.co/widget/v2.js
     */
    const widgetId = process.env.NEXT_PUBLIC_FEEDBACK_WIDGET_ID;

    if (!widgetId) return null;

    // Create the iframe element
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.feedbase.co/widget/' + widgetId;
    iframe.title = 'Feedbase';
    iframe.height = '36';
    iframe.width = '125';
    iframe.allowTransparency = 'true';
    iframe.style = 'position: fixed; bottom: 0; left: 16px; border: none; overflow: hidden; background: transparent;';
    iframe.style.zIndex = 15;
    if (window.innerWidth > 768) {
      iframe.style.zIndex = 45;
    }

    // Add event listener for iframe load
    iframe.addEventListener('load', function () {
      let timeoutId = null;

      // Add event listener for mouseenter
      iframe.addEventListener('mouseenter', function () {
        clearTimeout(timeoutId);
        iframe.height = '260';
        iframe.width = '320';
      });

      // Add event listener for mouseleave
      iframe.addEventListener('mouseleave', function () {
        timeoutId = setTimeout(function () {
          iframe.height = '36';
          iframe.width = '125';
        }, 300);
      });
    });

    // Append the iframe to the page
    document.body.appendChild(iframe);
  }, []);

  return null;
}
