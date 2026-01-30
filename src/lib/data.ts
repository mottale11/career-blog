import {
  slugify
} from './utils';
import type {
  Opportunity,
  Category,
  Level
} from './types';

const opportunities: Opportunity[] = [{
    id: '1',
    title: 'Google Software Engineering Internship',
    category: 'Internships',
    organization: 'Google',
    location: 'Mountain View, CA',
    country: 'USA',
    level: 'Undergraduate',
    summary: 'Join Google for a 12-week paid internship to work on impactful projects.',
    description: 'The Software Engineering Internship program is a 12-14 week internship for students. Interns will work on a specific project critical to Google’s needs. We offer a variety of projects in areas such as software development, site reliability, and machine learning.',
    eligibility: ['Currently pursuing a BS, MS or PhD in computer science or a related technical field.', 'Experience in software development in one or more general-purpose programming languages.', 'Must be returning to a degree program after the internship ends.'],
    benefits: ['Competitive salary', 'Housing stipend', 'Relocation assistance', 'Health benefits', 'Professional development opportunities'],
    applicationProcess: 'Apply online through the Google Careers portal. The process includes a resume screen, a technical phone interview, and a series of onsite interviews.',
    deadline: '2024-12-15T23:59:59Z',
    applicationLink: '#',
    featured: true,
    trending: true,
    image: 'https://picsum.photos/seed/1/600/400',
    imageHint: 'tech office',
  },
  {
    id: '2',
    title: 'Rhodes Scholarship at Oxford University',
    category: 'Scholarships',
    organization: 'University of Oxford',
    location: 'Oxford',
    country: 'UK',
    level: 'Postgraduate',
    summary: 'A prestigious postgraduate award supporting exceptional students from around the world to study at the University of Oxford.',
    description: 'The Rhodes Scholarship is a life-changing opportunity to join a talented, diverse, and motivated community of scholars at Oxford. The scholarship covers all University and College fees, a personal stipend, and one economy class airfare to Oxford at the start of the scholarship and one economy class airfare back to the student\'s home country at the conclusion of the scholarship.',
    eligibility: ['Citizen of a Rhodes-eligible country.', 'Must have completed a Bachelor\'s degree to a high standard.', 'Specific age requirements apply.'],
    benefits: ['Full tuition fees covered', 'Annual stipend (£18,180 per annum for 2023-24)', 'Two return flights to the UK'],
    applicationProcess: 'Applications are made online. Required documents include an academic statement, a personal statement, and letters of recommendation. Shortlisted candidates are invited for an interview.',
    deadline: '2024-10-31T23:59:59Z',
    applicationLink: '#',
    featured: true,
    trending: false,
    image: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'university campus',
  },
  {
    id: '3',
    title: 'Data Scientist at Meta',
    category: 'Jobs',
    organization: 'Meta',
    location: 'Menlo Park, CA',
    country: 'USA',
    level: 'Professional',
    summary: 'Meta is seeking an experienced Data Scientist to join our product analytics team.',
    description: 'As a Data Scientist, you will be responsible for leading data-driven initiatives. You will work on a major project and collaborate with a team of engineers, product managers, and other data scientists to drive product strategy.',
    eligibility: ['PhD, or MS/BS in a quantitative field (e.g., Computer Science, Engineering, Statistics).', '4+ years of experience in data science or analytics.', 'Proficiency in SQL, Python or R.'],
    benefits: ['Competitive salary and bonus', 'Comprehensive health benefits', 'Stock options', 'Generous parental leave'],
    applicationProcess: 'Submit your resume and cover letter through the Meta Careers portal. The interview process includes a technical screening, a data challenge, and several rounds of onsite interviews.',
    deadline: '2025-01-31T23:59:59Z',
    applicationLink: '#',
    featured: false,
    trending: true,
    image: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'data visualization',
  },
  {
    id: '4',
    title: 'Fulbright Foreign Student Program',
    category: 'Fellowships',
    organization: 'U.S. Department of State',
    location: 'Various Universities',
    country: 'USA',
    level: 'Graduate',
    summary: 'Enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.',
    description: 'The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to research and study in the United States for one year or longer at U.S. universities or other appropriate institutions. The program operates in more than 160 countries worldwide.',
    eligibility: ['Country-specific eligibility requirements apply.', 'Typically requires a completed undergraduate degree.', 'Proficiency in English.'],
    benefits: ['Tuition and fees', 'A living stipend', 'Health insurance', 'Travel allowance'],
    applicationProcess: 'All Foreign Student Program applications are processed by bi-national Fulbright Commissions/Foundations or U.S. Embassies. Therefore, foreign students must apply through the Fulbright Commission/Foundation or U.S. Embassy in their home countries.',
    deadline: '2024-11-01T23:59:59Z',
    applicationLink: '#',
    featured: false,
    trending: true,
    image: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'diverse students',
  },
  {
    id: '5',
    title: 'National Geographic Early Career Grant',
    category: 'Grants',
    organization: 'National Geographic Society',
    location: 'Worldwide',
    country: 'Global',
    level: 'All Levels',
    summary: 'The National Geographic Early Career Grant is designed to offer less experienced individuals an opportunity to lead a project.',
    description: 'Early Career Grants are designed to offer less experienced individuals an opportunity to lead a project. Grant-funded projects should be bold, innovative, and transformative. All proposed projects must be in alignment with one of the National Geographic Society’s three focus areas: The Human Journey, Wildlife and Wild Places, and Our Changing Planet.',
    eligibility: ['No advanced degrees are required.', 'Applicants must be at least 18 years old.', 'Project must align with National Geographic\'s focus areas.'],
    benefits: ['Funding ranging from $5,000 to $10,000', 'Networking opportunities', 'Support from the National Geographic Society'],
    applicationProcess: 'Proposals are submitted online via the National Geographic grants portal. The application includes a project description, budget, and timeline.',
    deadline: '2024-12-31T23:59:59Z',
    applicationLink: '#',
    featured: true,
    trending: false,
    image: 'https://picsum.photos/seed/5/600/400',
    imageHint: 'wildlife photography',
  },
  {
    id: '6',
    title: 'Effective Communication in the Workplace',
    category: 'Career Advice',
    organization: 'Jobsyde',
    location: 'Online',
    country: 'Global',
    level: 'All Levels',
    summary: 'Learn how to communicate effectively to build stronger professional relationships and advance your career.',
    description: 'This article provides a comprehensive guide to mastering communication in a professional setting. Topics covered include active listening, non-verbal communication, clarity and conciseness, providing feedback, and navigating difficult conversations. Real-world examples and actionable tips are provided to help you improve your communication skills.',
    eligibility: [],
    benefits: [],
    applicationProcess: '',
    deadline: '2029-12-31T23:59:59Z',
    applicationLink: '',
    featured: false,
    trending: false,
    image: 'https://picsum.photos/seed/6/600/400',
    imageHint: 'team meeting',
  },
  {
    id: '7',
    title: 'Study in Australia: A Comprehensive Guide',
    category: 'Study Abroad',
    organization: 'International Student Hub',
    location: 'Australia',
    country: 'Australia',
    level: 'All Levels',
    summary: 'Everything you need to know about studying in Australia, from university selection to visa applications.',
    description: 'This guide covers all aspects of studying in Australia. It provides information on the Australian education system, top universities, popular courses, cost of living, student visa requirements, and scholarship opportunities. It also includes tips for adapting to life in Australia.',
    eligibility: [],
    benefits: [],
    applicationProcess: '',
    deadline: '2029-12-31T23:59:59Z',
    applicationLink: '',
    featured: false,
    trending: false,
    image: 'https://picsum.photos/seed/7/600/400',
    imageHint: 'Sydney opera',
  },
  {
    id: '8',
    title: 'Marketing Internship at HubSpot',
    category: 'Internships',
    organization: 'HubSpot',
    location: 'Dublin',
    country: 'Ireland',
    level: 'Undergraduate',
    summary: 'Join HubSpot\'s marketing team for a summer internship and gain hands-on experience in inbound marketing.',
    description: 'As a Marketing Intern, you will be involved in content creation, social media marketing, SEO, and data analysis. This is a great opportunity to learn from industry experts and contribute to real marketing campaigns.',
    eligibility: ['Currently enrolled in a Bachelor\'s degree in Marketing, Business, or a related field.', 'Strong written and verbal communication skills.', 'Familiarity with digital marketing concepts.'],
    benefits: ['Paid internship', 'Mentorship program', 'Free lunch and snacks', 'Opportunity for a full-time offer'],
    applicationProcess: 'Apply online with your resume and a cover letter. You may be asked to complete a short marketing challenge.',
    deadline: '2025-03-01T23:59:59Z',
    applicationLink: '#',
    featured: false,
    trending: true,
    image: 'https://picsum.photos/seed/8/600/400',
    imageHint: 'marketing chart',
  },
];

const opportunitiesWithSlugs = opportunities.map(opportunity => ({
  ...opportunity,
  slug: slugify(opportunity.title),
}));


export async function getOpportunities(category ? : Category) {
  if (category) {
    return opportunitiesWithSlugs.filter(o => o.category === category);
  }
  return opportunitiesWithSlugs;
}

export async function getOpportunityBySlug(slug: string) {
  return opportunitiesWithSlugs.find(o => o.slug === slug);
}

export const categories: {
  name: Category,
  description: string
} [] = [{
    name: 'Jobs',
    description: 'Find your next career move with our curated list of job openings.'
  },
  {
    name: 'Scholarships',
    description: 'Discover funding opportunities for your undergraduate and postgraduate studies.'
  },
  {
    name: 'Internships',
    description: 'Gain valuable work experience with internships from top companies.'
  },
  {
    name: 'Fellowships',
    description: 'Advance your research or professional skills with prestigious fellowships.'
  },
  {
    name: 'Grants',
    description: 'Secure funding for your projects, research, and creative endeavors.'
  },
  {
    name: 'Career Advice',
    description: 'Get expert tips and guidance to navigate your career path successfully.'
  },
  {
    name: 'Study Abroad',
    description: 'Explore opportunities to study in different countries and broaden your horizons.'
  },
];
