  import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
  import { AppSidebar } from "./components/app-sidebar";

  export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-screen h-fit">
        <AppSidebar />
        <SidebarTrigger />
        <main className="flex-1 flex flex-col items-center">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
