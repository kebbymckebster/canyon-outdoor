/** Canyon Outdoor route map: a menu-first multi-page experience that keeps the header focused on brand and navigation. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Process from "./pages/Process";
import About from "./pages/About";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work" component={Work} />
      <Route path="/services" component={Services} />
      <Route path="/process" component={Process} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
