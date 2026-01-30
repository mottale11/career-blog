'use client';

import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Newspaper } from "lucide-react";
import Link from "next/link";
import { LogoIcon } from "@/components/logo-icon";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
                <Link href="/admin" className="flex items-center space-x-2">
                    <LogoIcon className="h-8 w-8" />
                    <span className="font-bold sm:inline-block font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                        Jobsyde Admin
                    </span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
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
                </SidebarMenu>
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
