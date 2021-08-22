import PDFViewer from '@/components/PDFViewer';

export default function PDFViewerUrl({ url }) {
  // Uses a proxy server to bypass CORS
  const fileUrl = `${process.env.NEXT_PUBLIC_PROXY_URL}/${url}`;

  return <PDFViewer url={fileUrl} />;
}
