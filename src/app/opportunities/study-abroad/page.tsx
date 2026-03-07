import type { Metadata } from 'next';
import Link from 'next/link';
import { getOpportunities } from '@/lib/data';
import { OpportunityCard } from '@/components/opportunity-card';
import {
    Globe,
    GraduationCap,
    DollarSign,
    FileText,
    Plane,
    Heart,
    ArrowRight,
    BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'Study Abroad',
    description:
        'Explore study abroad programs, fully funded scholarships, exchange opportunities, and expert guides to help you pursue your education internationally.',
};

const guides = [
    {
        icon: Globe,
        title: 'Choosing a Program',
        description:
            'Find the right program for your goals. Learn how to compare universities, research program rankings, evaluate faculty, and align your choice with your long-term career ambitions.',
        tips: ['Match your career goals', 'Check accreditation', 'Research rankings', 'Consider location & culture'],
    },
    {
        icon: DollarSign,
        title: 'Funding Your Studies',
        description:
            'Studying abroad doesn\'t have to break the bank. Discover fully funded scholarships, government grants, university bursaries, and part-time work opportunities available to international students.',
        tips: ['Apply for fully funded scholarships', 'Look for country-specific grants', 'Check university bursaries', 'Explore work-study options'],
    },
    {
        icon: FileText,
        title: 'Application Strategy',
        description:
            'Submit a competitive application. From writing a compelling Statement of Purpose to gathering strong references, learn how to present your best self to international admissions committees.',
        tips: ['Start 12 months early', 'Write a compelling SOP', 'Get strong references', 'Prepare for entrance exams'],
    },
    {
        icon: Plane,
        title: 'Visas & Documentation',
        description:
            'Navigate the visa process with confidence. Understand student visa requirements, document checklists, timelines, and common pitfalls to avoid delays in your admission.',
        tips: ['Apply visa early', 'Organise all documents', 'Get transcripts translated', 'Show proof of funds'],
    },
    {
        icon: Heart,
        title: 'Cultural Preparation',
        description:
            'Arrive prepared for life in a new country. Understand cultural differences, learn key phrases, set realistic expectations, and discover strategies for overcoming culture shock.',
        tips: ['Learn basic local phrases', 'Join international student groups', 'Connect with alumni', 'Stay open-minded'],
    },
    {
        icon: GraduationCap,
        title: 'Maximising Your Experience',
        description:
            'Make the most of every moment abroad. Build a global network, take on internships, explore research opportunities, and turn your international degree into a career springboard.',
        tips: ['Network aggressively', 'Take internships abroad', 'Explore research opportunities', 'Embrace new experiences'],
    },
];

const destinations = [
    { country: 'United States', flag: '🇺🇸', highlight: 'Top research universities & innovation hubs' },
    { country: 'United Kingdom', flag: '🇬🇧', highlight: 'World-class institutions, rich academic tradition' },
    { country: 'Canada', flag: '🇨🇦', highlight: 'Welcoming to international students, post-study work routes' },
    { country: 'Germany', flag: '🇩🇪', highlight: 'Tuition-free public universities, engineering excellence' },
    { country: 'Australia', flag: '🇦🇺', highlight: 'High quality of life, strong student visa support' },
    { country: 'Netherlands', flag: '🇳🇱', highlight: 'English-taught programs, central European location' },
];

export default async function StudyAbroadPage() {
    const opportunities = await getOpportunities({ category: 'Study Abroad' });

    return (
        <div className="space-y-16">
            {/* Hero */}
            <section className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-500 text-white px-8 py-16 md:py-20 text-center">
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px), radial-gradient(circle at 70% 30%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                        <Globe className="w-4 h-4" />
                        International Education
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 leading-tight">
                        Study Abroad Opportunities
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-8">
                        Discover fully funded scholarships, exchange programs, and expert guides to launch your international education journey.
                    </p>
                    <Link
                        href="/opportunities/scholarships"
                        className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
                    >
                        Browse Scholarships <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Destinations */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">Popular Destinations</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {destinations.map((dest) => (
                        <div
                            key={dest.country}
                            className="rounded-xl border bg-card p-4 text-center hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-default"
                        >
                            <div className="text-4xl mb-2">{dest.flag}</div>
                            <p className="font-semibold text-sm font-headline">{dest.country}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-tight">{dest.highlight}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Guides Grid */}
            <section>
                <div className="flex items-center gap-3 mb-8">
                    <BookOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">Study Abroad Guides</h2>
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

            {/* Stats Banner */}
            <section className="rounded-xl bg-muted px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                    { stat: '5M+', label: 'international students study abroad worldwide each year' },
                    { stat: '25%', label: 'average salary premium for graduates with international experience' },
                    { stat: '1,000s', label: 'of fully funded scholarships available annually — apply early' },
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
                    <h2 className="text-2xl font-bold font-headline">Study Abroad Opportunities</h2>
                    <Link
                        href="/opportunities/scholarships"
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        View scholarships <ArrowRight className="w-3.5 h-3.5" />
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
                        <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <h3 className="font-semibold text-lg mb-1">Study Abroad Listings Coming Soon</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            We&apos;re curating the best international study opportunities. In the meantime, browse our scholarship listings.
                        </p>
                        <Link
                            href="/opportunities/scholarships"
                            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-full hover:bg-primary/90 transition-colors"
                        >
                            Browse Scholarships <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
