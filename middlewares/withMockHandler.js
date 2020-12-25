/**
 * Bunch of mock data
 */

const loginSuccessful = {
  auth: true,
  userToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMzQ1NjciLCJwYXNzd29yZCI6IjEyMzQ1NjciLCJpYXQiOjE2MDg4MDE5MDh9.HyS3Mb5BTNRagKsYQOzxd6OFC5uSpFQP6Z1F76hjeSs',
};

const loginFailed = {
  auth: false,
};

const announcements = [
  {
    id: 1,
    message: 'Instructions and Schedule for Filling of Regular Examination forms',
    date: '20 Oct 2020',
    url: 'http://www.ptuexam.com/enquiry/DownloadDocZ',
  },
  {
    id: 2,
    message: 'Proposed Date Sheet for Regular Semester Examination',
    date: '6 Nov 2020',
    url: 'http://www.ptuexam.com/enquiry/DownloadDocZ',
  },
  {
    id: 3,
    message: 'No Dues for regular semester examination',
    date: '30 Nov 2020',
    url: 'http://www.ptuexam.com/enquiry/DownloadDocZ',
  },
];

const documents = [
  {
    id: 1,
    title: 'BCA, FIRST Semester NEW 2K11, Regular Result',
    date: '03 Mar 2020',
    url: 'http://www.ptuexam.com/OnlineDocuments',
  },
  {
    id: 2,
    title: 'BCA, SECOND Semester NEW 2K11, Regular Result',
    date: '03 Sep 2020',
    url: 'http://www.ptuexam.com/OnlineDocuments',
  },
  {
    id: 3,
    title: 'BCA, Semester-3, 2015, Regular Result',
    date: '17 Feb 2021',
    url: 'http://www.ptuexam.com/OnlineDocuments',
  },
];

const payments = [
  {
    id: 1,
    examSession: 'April-2020',
    feeType: 'Examination Fee',
    amount: 1250,
    paymentStatus: 'Payment Successful',
    date: ['Monday, 1 March 2020 06:00:00', 'Monday, 1 March 2020 07:00:00'],
    url: 'http://ptuexam.com/ASheetConfirmedPaymentSlip.aspx',
  },
  {
    id: 2,
    examSession: 'November-2020',
    feeType: 'Examination Fee',
    amount: 700,
    paymentStatus: 'Payment Failed',
    date: ['Monday, 2 October 2020 08:00:00'],
    url: 'http://ptuexam.com/ASheetConfirmedPaymentSlip.aspx',
  },
  {
    id: 3,
    examSession: 'April-2021',
    feeType: 'Examination Fee',
    amount: 1250,
    paymentStatus: 'Payment Successful',
    date: ['Monday, 3 March 2021 11:00:00', 'Monday, 3 March 2021 11:00:00'],
    url: 'http://ptuexam.com/ASheetConfirmedPaymentSlip.aspx',
  },
];

const profile = {
  rollNo: '1234567',
  collegeName: 'Punjab College of Technical Education, Baddowal, Ludhiana',
  programme: 'Bachelor of Computer Applications',
  admissionStatus: '2020 / Normal Admission',
  studentName: 'LUKE SKYWALKER',
  fatherName: 'ANAKIN SKYWALKER',
  motherName: 'PADME AMIDALA',
  currentSemester: '1',
  branchId: '10',
  photo: 'https://thechristiannerd.files.wordpress.com/2011/04/luke-skywalker.jpg',
  signature: 'https://powerhousebooks.com/newsletters/100308/daniel_signature.jpg',
};

/**
 * This handles the incoming request and respond with mock data
 */
export const withMockHandler = (handler) => (req, res) => {
  // If the MOCK_ENV variable is false, it will skip this middleware
  if (!JSON.parse(process.env.MOCK_ENV)) return handler(req, res);
  if (req.url.includes('login')) {
    if (req.body.username === '1234567' && req.body.password === '1234567') {
      return res.json({ loginSuccessful });
    } else {
      return res.json({ loginFailed });
    }
  }
  if (req.url.includes('announcements')) return res.json({ announcements });
  if (req.url.includes('documents')) return res.json({ documents });
  if (req.url.includes('payments')) return res.json({ payments });
  if (req.url.includes('profile')) return res.json({ profile });
  return res.status(404).json({
    error: true,
    message: 'This mock route could not be found',
  });
};
