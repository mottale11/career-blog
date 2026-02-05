'use client';

import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
    title: string;
    text: string;
    url?: string;
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
    const { toast } = useToast();
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareUrl = url || window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                toast({
                    title: "Link Copied",
                    description: "The link has been copied to your clipboard.",
                });
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                toast({
                    title: "Error",
                    description: "Failed to copy link.",
                    variant: "destructive"
                });
            }
        }
    };

    return (
        <Button variant="outline" className="w-full" onClick={handleShare}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Share'}
        </Button>
    );
}
