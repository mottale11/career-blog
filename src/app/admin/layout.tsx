'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Newspaper, Tags, History, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { LogoIcon } from "@/components/logo-icon";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AdminSidebarContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab');

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/admin'} tooltip="Dashboard">
                    <Link href="/admin">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/opportunities')} tooltip="Opportunities">
                    <Link href="/admin/opportunities">
                        <Newspaper />
                        <span>Opportunities</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/taxonomies') && (!currentTab || currentTab === 'categories')} tooltip="Categories">
                    <Link href="/admin/taxonomies?tab=categories">
                        <Tags />
                        <span>Categories</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/taxonomies') && currentTab === 'industries'} tooltip="Industries">
                    <Link href="/admin/taxonomies?tab=industries">
                        <Briefcase />
                        <span>Industries</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/taxonomies') && currentTab === 'fields'} tooltip="Fields">
                    <Link href="/admin/taxonomies?tab=fields">
                        <GraduationCap />
                        <span>Fields</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith('/admin/status')} tooltip="Status">
                    <Link href="/admin/status">
                        <History />
                        <span>Status</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <Sidebar variant="inset" collapsible="icon">
                <SidebarHeader>
                    <Link href="/admin" className="flex items-center space-x-2">
                        <LogoIcon className="h-8 w-8" />
                        <span className="font-bold sm:inline-block font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                            Jobslot Admin
                        </span>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading navigation...</div>}>
                        <AdminSidebarContent />
                    </Suspense>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
