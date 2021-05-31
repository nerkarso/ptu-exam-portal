import EmptyMessage from '@/components/EmptyMessage';
import ErrorMessage from '@/components/ErrorMessage';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Avatar from '@/elements/Avatar';
import { useApi } from '@/hooks/useApi';
import { toTitleCase } from '@/utils/index';

Profile.title = 'Profile';

export default function Profile() {
  return (
    <ProtectedRoute>
      <Layout title={Profile.title}>
        <div className="flex-grow h-full p-6 overflow-y-auto">
          <div className="container h-full max-w-screen-md">
            <ProfileContent />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { data, error, loading } = useApi('/profile');

  if (loading) return <ProfileSkeleton />;
  if (error) return <ErrorMessage title="Error" text={error.message} />;
  if (data.error) return <ErrorMessage title="Error" text={data.message} />;
  if (!data.profile) return <EmptyMessage title="No details available" text="Your profile details will appear here" />;

  const {
    admissionStatus,
    branch,
    course,
    currentSemester,
    degreeStatus,
    email,
    fatherName,
    instituteName,
    mobile,
    motherName,
    photo,
    signature,
    studentName,
  } = data.profile;

  return (
    <div className="gap-8 md:flex">
      <div className="grid mb-4 place-items-center md:block">
        <Avatar src={photo} alt="Avatar" className="w-32 h-32 shadow" />
      </div>
      <div className="flex flex-col">
        <div className="mb-5">
          <DetailLabel>Name</DetailLabel>
          <p className="text-2xl font-bold md:text-4xl">{toTitleCase(studentName)}</p>
        </div>
        <div className="gap-8 sm:flex">
          <DetailGroup label="Email" text={email} />
          <DetailGroup label="Mobile" text={mobile} />
        </div>
        <div className="gap-8 sm:flex">
          <DetailGroup label="Father's name" text={toTitleCase(fatherName)} />
          <DetailGroup label="Mother's name" text={toTitleCase(motherName)} />
        </div>
        <DetailGroup label="Institute" text={toTitleCase(instituteName)} />
        <DetailGroup label="Branch" text={branch} />
        <div className="gap-8 sm:flex">
          <DetailGroup label="Course" text={course} />
          <DetailGroup label="Current semester" text={currentSemester} />
        </div>
        <div className="gap-8 sm:flex">
          <DetailGroup label="Admission status" text={admissionStatus} />
          <DetailGroup label="Degree status" text={degreeStatus} />
        </div>
        {signature && (
          <div className="mb-5">
            <DetailLabel>Signature</DetailLabel>
            <img src={signature} className="max-w-xs" alt="Signature" />
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:items-center md:flex-row animate-pulse">
      <div className="grid place-items-center">
        <div className="w-32 h-32 rounded-full bg-base-300 dark:bg-invert-600"></div>
      </div>
      <div className="flex-grow space-y-6">
        <div className="space-y-3">
          <div className="w-1/4 h-4 rounded bg-base-300 dark:bg-invert-600"></div>
          <div className="w-3/4 h-6 rounded bg-base-300 dark:bg-invert-600"></div>
        </div>
        <div className="space-y-3">
          <div className="w-2/4 h-4 rounded bg-base-300 dark:bg-invert-600"></div>
          <div className="w-1/3 h-4 rounded bg-base-300 dark:bg-invert-600"></div>
        </div>
      </div>
    </div>
  );
}

function DetailGroup({ label, text }) {
  return (
    <div className="flex-1 mb-5">
      <DetailLabel>{label}</DetailLabel>
      <p className="text-lg">{text}</p>
    </div>
  );
}

function DetailLabel({ children }) {
  return <h6 className="mb-1 text-sm opacity-50">{children}</h6>;
}
