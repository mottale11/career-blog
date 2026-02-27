import { cn } from '@/lib/utils';

// Maps a tag label to a distinct color class set
function tagColor(label: string): string {
    const l = label.toUpperCase();
    if (l === 'REMOTE') return 'bg-sky-100 text-sky-700 border-sky-200';
    if (l === 'FULL TIME' || l === 'FULL_TIME')
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (l === 'PART TIME' || l === 'PART_TIME')
        return 'bg-teal-100 text-teal-700 border-teal-200';
    if (l === 'INTERNSHIP' || l === 'INTERN')
        return 'bg-violet-100 text-violet-700 border-violet-200';
    if (l === 'CONTRACT' || l === 'CONTRACTOR')
        return 'bg-orange-100 text-orange-700 border-orange-200';
    if (l === 'FREELANCE') return 'bg-pink-100 text-pink-700 border-pink-200';
    if (l === 'VOLUNTEER') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (l === 'JOBS') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (l === 'SCHOLARSHIPS') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (l === 'FELLOWSHIPS') return 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200';
    if (l === 'GRANTS') return 'bg-lime-100 text-lime-700 border-lime-200';
    if (l === 'CAREER ADVICE') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (l === 'STUDY ABROAD') return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    // fallback
    return 'bg-muted text-muted-foreground border-border';
}

type TagBadgeProps = {
    label: string;
    className?: string;
};

export function TagBadge({ label, className }: TagBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
                tagColor(label),
                className
            )}
        >
            {label}
        </span>
    );
}
