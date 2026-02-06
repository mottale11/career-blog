'use client';

import * as React from 'react';
import { signIn } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        try {
            const result = await signIn(formData);
            if (result?.error) {
                toast({
                    title: 'Login failed',
                    description: result.error,
                    variant: 'destructive',
                });
            } else if (result?.success) {
                toast({
                    title: 'Login successful',
                    description: "Redirecting to dashboard...",
                });
                router.push('/admin');
                router.refresh(); // Ensure session state is updated
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: "An unexpected error occurred",
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
