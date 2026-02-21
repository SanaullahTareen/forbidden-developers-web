import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import AIChatbot from './components/AIChatbot'
import ProtectedRoute from './components/ProtectedRoute'
import GoogleAnalytics from './components/GoogleAnalytics'
import { API_BASE_URL } from './lib/api'

// Lazy load sections for better performance
const Services = lazy(() => import('./components/Services'))
const Portfolio = lazy(() => import('./components/Portfolio'))
const Stats = lazy(() => import('./components/Stats'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTA = lazy(() => import('./components/CTA'))
const Footer = lazy(() => import('./components/Footer'))

// Lazy load pages
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const Blog = lazy(() => import('./pages/Blog'))
const Awards = lazy(() => import('./pages/Awards'))
const Projects = lazy(() => import('./pages/Projects'))
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'))
const MobileApps = lazy(() => import('./pages/services/MobileApps'))
const AIML = lazy(() => import('./pages/services/AIML'))
const UIUXDesign = lazy(() => import('./pages/services/UIUXDesign'))
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'))
const HelpCenter = lazy(() => import('./pages/resources/HelpCenter'))

// Lazy load templates
const Templates = lazy(() => import('./pages/Templates'))
const TechNova = lazy(() => import('./pages/templates/TechNova'))
const Lumina = lazy(() => import('./pages/templates/Lumina'))
const FinEdge = lazy(() => import('./pages/templates/FinEdge'))
const Flavor = lazy(() => import('./pages/templates/Flavor'))
const FitForge = lazy(() => import('./pages/templates/FitForge'))
const EcoVerde = lazy(() => import('./pages/templates/EcoVerde'))
const Vogue = lazy(() => import('./pages/templates/Vogue'))
const CarDrive = lazy(() => import('./pages/templates/CarDrive'))
const HomeFlow = lazy(() => import('./pages/templates/HomeFlow'))
const SneakHub = lazy(() => import('./pages/templates/SneakHub'))
const AdminPro = lazy(() => import('./pages/templates/AdminPro'))
const ShopHub = lazy(() => import('./pages/templates/ShopHub'))
const TravelMax = lazy(() => import('./pages/templates/TravelMax'))

// Lazy load special pages
const NotFound = lazy(() => import('./pages/NotFound'))
const Maintenance = lazy(() => import('./pages/Maintenance'))

// Lazy load legal pages
const Privacy = lazy(() => import('./pages/legal/Privacy'))
const Terms = lazy(() => import('./pages/legal/Terms'))

// Lazy load admin
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const ServicesAdmin = lazy(() => import('./pages/admin/ServicesAdmin'))
const ProjectsAdmin = lazy(() => import('./pages/admin/ProjectsAdmin'))
const StatsAdmin = lazy(() => import('./pages/admin/StatsAdmin'))
const HomepageContentAdmin = lazy(() => import('./pages/admin/HomepageContentAdmin'))
const TestimonialsAdmin = lazy(() => import('./pages/admin/TestimonialsAdmin'))
const CareersAdmin = lazy(() => import('./pages/admin/CareersAdmin'))
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'))
const AwardsAdmin = lazy(() => import('./pages/admin/AwardsAdmin'))
const AssetsAdmin = lazy(() => import('./pages/admin/AssetsAdmin'))
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin'))
const MessagesAdmin = lazy(() => import('./pages/admin/MessagesAdmin'))
const CallsAdmin = lazy(() => import('./pages/admin/CallsAdmin'))
const AnalyticsAdmin = lazy(() => import('./pages/admin/AnalyticsAdmin'))
const FAQAdmin = lazy(() => import('./pages/admin/FAQAdmin'))
const TicketsAdmin = lazy(() => import('./pages/admin/TicketsAdmin'))

// Maintenance Mode Wrapper - checks if site is under maintenance for public routes
const MaintenanceWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  // List of paths that should NOT be affected by maintenance mode
  const excludedPaths = [
    '/maintenance',
    '/fd-admin-portal',
    '/admin'
  ]

  const isExcludedPath = excludedPaths.some(path => location.pathname.startsWith(path))

  useEffect(() => {
    // Skip check for excluded paths
    if (isExcludedPath) {
      setLoading(false)
      return
    }

    const checkMaintenanceMode = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/content/settings`)
        const result = await response.json()
        // Handle both {data: {maintenanceMode}} and {maintenanceMode} formats
        const settings = result.data || result
        setIsMaintenanceMode(settings.maintenanceMode || false)
      } catch (error) {
        // If we can't check, assume site is live
        setIsMaintenanceMode(false)
      } finally {
        setLoading(false)
      }
    }

    checkMaintenanceMode()
  }, [location.pathname, isExcludedPath])

  // Show loading only briefly
  if (loading && !isExcludedPath) {
    return <LoadingScreen />
  }

  // If maintenance mode is active and not on excluded path, redirect
  if (isMaintenanceMode && !isExcludedPath && location.pathname !== '/maintenance') {
    return <Navigate to="/maintenance" replace />
  }

  return <>{children}</>
}

// Home page component
const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Suspense fallback={<LoadingScreen />}>
        <Services />
        <Portfolio />
        <Stats />
        <Testimonials />
        <CTA />
        <Footer />
      </Suspense>
    </main>
    <AIChatbot />
  </>
)

// Page layout with footer
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main>
      <Suspense fallback={<LoadingScreen />}>
        {children}
        <Footer />
      </Suspense>
    </main>
  </>
)

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MaintenanceWrapper>
          <div className="min-h-screen overflow-x-hidden transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Maintenance Page */}
              <Route path="/maintenance" element={<Suspense fallback={<LoadingScreen />}><Maintenance /></Suspense>} />
              {/* Company */}
              <Route path="/about" element={<PageLayout><About /></PageLayout>} />
              <Route path="/careers" element={<PageLayout><Careers /></PageLayout>} />
              <Route path="/blog" element={<PageLayout><Blog /></PageLayout>} />
              <Route path="/awards" element={<PageLayout><Awards /></PageLayout>} />
              <Route path="/projects" element={<PageLayout><Projects /></PageLayout>} />
              {/* Services */}
              <Route path="/services/web-development" element={<PageLayout><WebDevelopment /></PageLayout>} />
              <Route path="/services/mobile-apps" element={<PageLayout><MobileApps /></PageLayout>} />
              <Route path="/services/ai-ml" element={<PageLayout><AIML /></PageLayout>} />
              <Route path="/services/ui-ux-design" element={<PageLayout><UIUXDesign /></PageLayout>} />
              {/* Resources */}
              <Route path="/resources/case-studies" element={<PageLayout><CaseStudies /></PageLayout>} />
              <Route path="/resources/help-center" element={<PageLayout><HelpCenter /></PageLayout>} />
              {/* Templates Showcase */}
              <Route path="/templates" element={<PageLayout><Templates /></PageLayout>} />
              <Route path="/templates/technova" element={<Suspense fallback={<LoadingScreen />}><TechNova /></Suspense>} />
              <Route path="/templates/lumina" element={<Suspense fallback={<LoadingScreen />}><Lumina /></Suspense>} />
              <Route path="/templates/finedge" element={<Suspense fallback={<LoadingScreen />}><FinEdge /></Suspense>} />
              <Route path="/templates/flavor" element={<Suspense fallback={<LoadingScreen />}><Flavor /></Suspense>} />
              <Route path="/templates/fitforge" element={<Suspense fallback={<LoadingScreen />}><FitForge /></Suspense>} />
              <Route path="/templates/ecoverde" element={<Suspense fallback={<LoadingScreen />}><EcoVerde /></Suspense>} />
              <Route path="/templates/vogue" element={<Suspense fallback={<LoadingScreen />}><Vogue /></Suspense>} />
              <Route path="/templates/cardrive" element={<Suspense fallback={<LoadingScreen />}><CarDrive /></Suspense>} />
              <Route path="/templates/homeflow" element={<Suspense fallback={<LoadingScreen />}><HomeFlow /></Suspense>} />
              <Route path="/templates/sneakhub" element={<Suspense fallback={<LoadingScreen />}><SneakHub /></Suspense>} />
              <Route path="/templates/adminpro" element={<Suspense fallback={<LoadingScreen />}><AdminPro /></Suspense>} />
              <Route path="/templates/shophub" element={<Suspense fallback={<LoadingScreen />}><ShopHub /></Suspense>} />
              <Route path="/templates/travelmax" element={<Suspense fallback={<LoadingScreen />}><TravelMax /></Suspense>} />
              {/* Legal */}
              <Route path="/privacy" element={<PageLayout><Privacy /></PageLayout>} />
              <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
              {/* Secret Admin */}
              <Route path="/fd-admin-portal" element={<Suspense fallback={<LoadingScreen />}><AdminLogin /></Suspense>} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><AdminDashboard /></Suspense></ProtectedRoute>} />
              <Route path="/admin/messages" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><MessagesAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/calls" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><CallsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/services" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><ServicesAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><ProjectsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/stats" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><StatsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/homepage-content" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><HomepageContentAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/testimonials" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><TestimonialsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/careers" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><CareersAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/blog" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><BlogAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/awards" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><AwardsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/assets" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><AssetsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><SettingsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/analytics" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><AnalyticsAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/faqs" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><FAQAdmin /></Suspense></ProtectedRoute>} />
              <Route path="/admin/tickets" element={<ProtectedRoute><Suspense fallback={<LoadingScreen />}><TicketsAdmin /></Suspense></ProtectedRoute>} />
              {/* 404 - Must be last */}
              <Route path="*" element={<Suspense fallback={<LoadingScreen />}><NotFound /></Suspense>} />
            </Routes>
            <GoogleAnalytics />
          </div>
        </MaintenanceWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
