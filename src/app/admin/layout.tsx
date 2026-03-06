import type { Metadata } from 'next';
import AdminLayoutClient from './_components/admin-layout-client';

// Override root metadata to exclude the AdSense tag on admin pages
export const metadata: Metadata = {
    other: {},
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
