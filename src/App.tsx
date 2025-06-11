import type React from "react"
/* eslint-disable no-undef */
import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./services/api.ts"
import { ToastContainer } from "react-toastify"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import "react-toastify/dist/ReactToastify.css"
import LoadingSpinner from "./components/ui/LoadingSpinner"
import Footer from "./components/layout/Footer"
import { AppProvider } from "./context/AppContext"
import NavBar from "./components/layout/NavBar.tsx"
import { ThemeProvider } from "./context/ThemeContext"
import "./styles/globals.css"

// Eager load HomePage for better initial load experience
import HomePage from "./pages/HomePage.tsx"
import { getImageUrl } from "./utils/image.ts"

// Lazy load other pages to improve initial load time
const About = lazy(() => import("./pages/About"))
const BasementFriday = lazy(() => import("./pages/BasementFriday"))
const Charts = lazy(() => import("./pages/Charts"))
const UndergroundRadar = lazy(() => import("./pages/UndergroundRadar"))
const Events = lazy(() => import("./pages/Events"))
const Tickets = lazy(() => import("./pages/Tickets"))
const Shop = lazy(() => import("./pages/Shop"))
const UndergroundRave = lazy(() => import("./pages/UndergroundRave.tsx"))

// Critical assets to preload
const preloadAssets = [getImageUrl("logo.png")]

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider preloadAssets={preloadAssets}>
        <ThemeProvider>
          <Router>
            <main className="min-h-screen bg-black">
              <NavBar />
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen bg-black">
                    <LoadingSpinner size="lg" />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/friday" element={<BasementFriday />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/radar" element={<UndergroundRadar />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/tickets" element={<Tickets />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/rave" element={<UndergroundRave />} />
                  {/* Add other routes as needed */}
                </Routes>
              </Suspense>
              <Footer />
            </main>
          </Router>
          <ToastContainer position="bottom-right" theme="dark" limit={3} autoClose={3000} newestOnTop />
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        </ThemeProvider>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
