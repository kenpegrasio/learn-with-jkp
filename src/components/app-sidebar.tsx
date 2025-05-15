import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Account",
    icon: User,
    href: "/account",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-60 bg-zinc-950 text-white border-r border-zinc-800">
      <SidebarContent className="bg-zinc-950 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-400">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link, index) => (
                <SidebarMenuItem
                  key={index}
                  className="!bg-transparent !hover:bg-transparent !hover:text-white"
                >
                  <SidebarMenuButton asChild>
                    <Link
                      to={link.href}
                      className="flex items-center gap-3 p-2 text-white"
                    >
                      <link.icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
