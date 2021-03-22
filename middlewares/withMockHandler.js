import { constructSession } from '@/middlewares/withAuthHandler';
import { setCookie } from '@/utils/index';
import fs from 'fs';

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
    url: 'http://localhost',
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
    url: 'http://localhost',
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

export const results = [
  {
    id: 1,
    examSession: 'Nov-2018',
    examDetails: 'BCA, FIRST Semester NEW 2K11, Regular Result',
    date: '03 Mar 2019',
    filename: 'sample1.pdf',
  },
  {
    id: 2,
    examSession: 'April-2019',
    examDetails: 'BCA, SECOND Semester NEW 2K11, Regular Result',
    date: '03 Sep 2019',
    filename: 'invalid',
  },
  {
    id: 3,
    examSession: 'Nov-2019',
    examDetails: 'BCA, Semester-3, 2015, Regular Result',
    date: '17 Feb 2020',
    filename: 'sample2.pdf',
  },
];

export const marks = [
  {
    id: 1,
    examSession: 'Nov-2018',
    examDetails: 'BCA, FIRST Semester, NEW 2K11, Regular Result',
    date: '23 Mar 2019',
    filename: 'sample1.pdf',
  },
  {
    id: 2,
    examSession: 'April-2019',
    examDetails: 'BCA, SECOND Semester, New 2K11, Regular Result',
    date: '17 Sep 2019',
    filename: 'invalid',
  },
  {
    id: 3,
    examSession: 'Nov-2019',
    examDetails: 'BCA, Semester-3, 2016, Regular Result',
    date: '19 Feb 2020',
    filename: 'sample2.pdf',
  },
];

export const grades = [
  {
    id: 1,
    examSession: 'Nov-2018',
    examDetails: 'BCA, FIRST Semester NEW 2K11, Regular Result',
    date: '20 Mar 2019',
    filename: 'sample1.pdf',
  },
  {
    id: 2,
    examSession: '',
    examDetails: 'BCA 2011, 4th Semester, Regular Result',
    date: '27 Aug 2020',
    filename: 'invalid',
  },
  {
    id: 3,
    examSession: 'Nov-2019',
    examDetails: 'BCA, Semester-3, 2016, Regular Result',
    date: '18 Feb 2020',
    filename: 'sample2.pdf',
  },
];

export const degree = [
  {
    id: 1,
    title: 'Degree Certificate / April-2020',
    date: '01 Dec 2020',
    filename: 'sample1.pdf',
  },
  {
    id: 2,
    title: 'PDC Certificate / April-2020',
    date: '11 Nov 2020',
    filename: 'invalid',
  },
];

function getFileBlob() {
  const file = fs.readFileSync('./public/sample.pdf');
  return file.toString('base64');
}

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
      if (req.url.includes('login-mobile')) {
        setCookie(res, 'sessionMobile', constructSession('foo', 'bar'));
      } else {
        setCookie(res, 'session', constructSession('foo', 'bar'));
      }
      return res.json(loginSuccessful);
    }
  }
  if (req.url.includes('announcements')) return res.json({ announcements });
  if (req.url.includes('documents')) return res.json({ documents });
  if (req.url.includes('payments')) return res.json({ payments });
  if (req.url.includes('profile-details')) return res.json(profileDetails);
  if (req.url.includes('profile')) return res.json(profile);
  if (req.url.includes('.pdf')) return res.send(getFileBlob());
  if (req.url.includes('results')) return res.json({ results });
  if (req.url.includes('marks')) return res.json({ marks });
  if (req.url.includes('grades')) return res.json({ grades });
  if (req.url.includes('degree')) return res.json({ degree });
  // Route is not found
  return res.status(404).json({
    error: true,
    message: 'This mock route could not be found',
  });
};
