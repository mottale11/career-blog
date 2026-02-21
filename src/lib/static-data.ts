import type { Category } from './types';

// Static categories — these are fixed UI elements, not stored in the DB
export const categories: {
    name: Category;
    description: string;
}[] = [
        {
            name: 'Jobs',
            description: 'Find your next career move with our curated list of job openings.',
        },
        {
            name: 'Scholarships',
            description: 'Discover funding opportunities for your undergraduate and postgraduate studies.',
        },
        {
            name: 'Internships',
            description: 'Gain valuable work experience with internships from top companies.',
        },
        {
            name: 'Fellowships',
            description: 'Advance your research or professional skills with prestigious fellowships.',
        },
        {
            name: 'Grants',
            description: 'Secure funding for your projects, research, and creative endeavors.',
        },
        {
            name: 'Career Advice',
            description: 'Get expert tips and guidance to navigate your career path successfully.',
        },
        {
            name: 'Study Abroad',
            description: 'Explore opportunities to study in different countries and broaden your horizons.',
        },
    ];
