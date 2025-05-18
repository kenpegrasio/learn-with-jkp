import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-screen min-h-screen h-max bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <SidebarTrigger />
          <div className="flex flex-col items-center">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
