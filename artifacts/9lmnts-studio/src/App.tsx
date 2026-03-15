import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import EventOSDemo from "@/pages/EventOSDemo";
import SimpleBookingSystem from "@/pages/SimpleBookingSystem";

const queryClient = new QueryClient();

type Page = "demo" | "booking";

function AppContent() {
  const [page, setPage] = useState<Page>("demo");
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleNavigate = (target: string, service?: string) => {
    if (target === "booking") {
      setSelectedService(service);
      setPage("booking");
    } else if (target === "demo") {
      setPage("demo");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      {page === "demo" && (
        <EventOSDemo onNavigate={handleNavigate} />
      )}
      {page === "booking" && (
        <SimpleBookingSystem
          initialService={selectedService}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent /
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
