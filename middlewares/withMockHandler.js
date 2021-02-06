import { constructSession } from '@/middlewares/withAuthHandler';
import { setCookie } from '@/utils/index';

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

export const announcements = [
  {
    id: 1,
    title: 'Instructions and Schedule for Filling of Regular Examination forms',
    date: '20 Oct 2020',
    url: 'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf',
  },
  {
    id: 2,
    title:
      'Revised Amendment in Final Date Sheet for Regular Semester Examination in Offline Mode for session Nov-2020',
    date: '6 Nov 2020',
    url: 'http://localhost',
  },
  {
    id: 3,
    title: 'No Dues for Regular Semester Examination',
    date: '30 Nov 2020',
    url: 'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf',
  },
];

export const documents = [
  {
    id: 1,
    title: 'BCA, FIRST Semester NEW 2K11, Regular Result',
    date: '03 Mar 2020',
    url: 'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf',
  },
  {
    id: 2,
    title: 'BCA, SECOND Semester NEW 2K11, Regular Result',
    date: '03 Sep 2020',
    url: 'http://localhost',
  },
  {
    id: 3,
    title: 'BCA, Semester-3, 2015, Regular Result',
    date: '17 Feb 2021',
    url: 'https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf',
  },
];

export const payments = [
  {
    id: 1,
    examSession: 'April-2020',
    feeType: 'Examination Fee',
    amount: 1250,
    paymentStatus: 'Payment Successful',
    date: ['Monday, 1 March 2020 06:00:00', 'Monday, 1 March 2020 07:00:00'],
    url: 'http://www.ptuexam.com',
  },
  {
    id: 2,
    examSession: 'November-2020',
    feeType: 'Examination Fee',
    amount: 700,
    paymentStatus: 'Payment Failed',
    date: ['Monday, 2 October 2020 08:00:00'],
    url: 'http://invalid',
  },
  {
    id: 3,
    examSession: 'April-2021',
    feeType: 'Examination Fee',
    amount: 1250,
    paymentStatus: 'Payment Successful',
    date: ['Monday, 3 March 2021 11:00:00', 'Monday, 3 March 2021 11:00:00'],
    url: 'http://www.ptuexam.com',
  },
];

export const profile = {
  rollNo: '1234567',
  collegeName: 'Punjab College of Technical Education, Baddowal, Ludhiana',
  programme: 'Bachelor of Computer Applications',
  admissionStatus: '2020 / Normal Admission',
  studentName: 'LUKE SKYWALKER',
  fatherName: 'ANAKIN SKYWALKER',
  motherName: 'PADME AMIDALA',
  currentSemester: '1',
  branchId: '10',
};

export const profileDetails = {
  photo: 'https://thechristiannerd.files.wordpress.com/2011/04/luke-skywalker.jpg',
  signature: 'https://powerhousebooks.com/newsletters/100308/daniel_signature.jpg',
};

/**
 * This handles the incoming request and respond with mock data
 */
export const withMockHandler = (handler) => async (req, res) => {
  // If the MOCK_ENV variable is false, it will skip this middleware
  if (!JSON.parse(process.env.MOCK_ENV)) return handler(req, res);
  // Sleep for 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Respond with corresponding result
  if (req.url.includes('login')) {
    if (req.body.username === '0' && req.body.password === '0') {
      return res.json(loginFailed);
    } else {
      res.session = constructSession('foo', 'bar');
      setCookie(res, 'session', res.session);
      return res.json(loginSuccessful);
    }
  }
  if (req.url.includes('announcements')) return res.json({ announcements });
  if (req.url.includes('documents')) return res.json({ documents });
  if (req.url.includes('payments')) return res.json({ payments });
  if (req.url.includes('profile-details')) return res.json(profileDetails);
  if (req.url.includes('profile')) return res.json(profile);
  // Route is not found
  return res.status(404).json({
    error: true,
    message: 'This mock route could not be found',
  });
};