import type { Metadata } from 'next';
import Link from 'next/link';
import { getOpportunities } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunity-card';
import {
    FileText,
    Mic2,
    Users,
    TrendingUp,
    DollarSign,
    RefreshCw,
    ArrowRight,
    BookOpen,
    Lightbulb,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Career Advice',
    description:
        'Expert career advice, job search tips, resume writing guides, interview preparation, and professional development resources to help you advance your career.',
};

const guides = [
    {
        icon: FileText,
        title: 'Resume & CV Writing',
        description:
            'Craft a standout resume that gets past ATS systems and impresses hiring managers. Learn formatting best practices, how to quantify achievements, and tailor your CV for each application.',
        tips: ['Use action verbs', 'Quantify achievements', 'Tailor to each job', 'Keep it concise'],
    },
    {
        icon: Mic2,
        title: 'Interview Preparation',
        description:
            'Walk into every interview with confidence. Master the STAR method, prepare for behavioural and technical questions, and learn how to make a lasting first impression.',
        tips: ['Research the company', 'Practice STAR answers', 'Prepare your questions', 'Follow up after'],
    },
    {
        icon: Users,
        title: 'Professional Networking',
        description:
            'Build a powerful professional network that opens doors. Discover strategies for LinkedIn, industry events, informational interviews, and maintaining meaningful connections.',
        tips: ['Optimise your LinkedIn', 'Attend industry events', 'Give before you take', 'Stay consistent'],
    },
    {
        icon: DollarSign,
        title: 'Salary Negotiation',
        description:
            'Know your worth and negotiate confidently. Learn how to research market rates, time your ask, handle counter-offers, and negotiate beyond just the base salary.',
        tips: ['Research market rates', 'Let them go first', 'Negotiate the full package', 'Practice out loud'],
    },
    {
        icon: RefreshCw,
        title: 'Career Change & Transition',
        description:
            'Thinking about switching careers? Get a practical roadmap for identifying transferable skills, bridging gaps, rebranding yourself, and landing your first role in a new field.',
        tips: ['Audit your skills', 'Identify skill gaps', 'Build a portfolio', 'Network into the new field'],
    },
    {
        icon: TrendingUp,
        title: 'Professional Development',
        description:
            'Never stop growing. Explore certifications, online courses, mentorship, and performance strategies that accelerate promotions and keep your skills relevant in a fast-changing market.',
        tips: ['Set clear goals', 'Find a mentor', 'Learn continuously', 'Track your wins'],
    },
];

export default async function CareerAdvicePage() {
    const opportunities = await getOpportunities({ category: 'Career Advice' });

    return (
        <div className="space-y-16">
            {/* Hero */}
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground px-8 py-16 md:py-20 text-center">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <Lightbulb className="w-4 h-4" />
                        Career Resources
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 leading-tight">
                        Career Advice &amp; Professional Development
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8">
                        Expert guidance to help you navigate your career — from writing the perfect CV to negotiating your dream salary.
                    </p>
                    <Link
                        href="/opportunities"
                        className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                    >
                        Browse All Opportunities <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Guides Grid */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">Career Guides</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((guide) => (
                        <div
                            key={guide.title}
                            className="group rounded-xl border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
                        >
                            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <guide.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-semibold font-headline text-lg mb-2">{guide.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{guide.description}</p>
                            <ul className="space-y-1">
                                {guide.tips.map((tip) => (
                                    <li key={tip} className="text-xs text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Tips Banner */}
            <section className="rounded-xl bg-muted px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                    { stat: '73%', label: 'of jobs are filled through networking — build your connections now' },
                    { stat: '6 sec', label: 'average time a recruiter spends on a CV — make every word count' },
                    { stat: '30%', label: 'higher salary on average when candidates negotiate confidently' },
                ].map(({ stat, label }) => (
                    <div key={stat}>
                        <p className="text-4xl font-bold font-headline text-primary mb-2">{stat}</p>
                        <p className="text-sm text-muted-foreground">{label}</p>
                    </div>
                ))}
            </section>

            {/* Live Opportunities */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold font-headline">Career Advice Opportunities</h2>
                    <Link
                        href="/opportunities"
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        View all <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
                {opportunities.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {opportunities.map((opportunity) => (
                            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 border-dashed border-2 rounded-xl bg-muted/30">
                        <Lightbulb className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-1">New Opportunities Coming Soon</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            We&apos;re curating the best career development opportunities. Check back soon.
                        </p>
                        <Link
                            href="/opportunities"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Browse All Opportunities <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
