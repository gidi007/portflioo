"use client"

import { Calendar, Ticket, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import NavBar from "../components/layout/NavBar"

const Tickets = () => {
  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] min-h-screen pt-24 pb-16">
        <div className="container-fluid">
          {/* Back to Home */}
          <div className="py-4">
            <Link to="/" className="inline-flex items-center text-subtle hover:text-accent transition-colors">
              <span className="text-sm uppercase font-bold">Back to Home</span>
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-[var(--text-primary)] text-4xl md:text-6xl font-bold">TICKETS</h1>
              <Ticket className="h-8 w-8 text-[var(--text-accent)]" />
            </div>
            <p className="text-[var(--text-secondary)] text-lg mb-8">Get your tickets for our upcoming underground events</p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[var(--muted)] rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                  <div className="bg-[var(--primary)] p-4 rounded-full">
                    <Calendar className="h-10 w-10 text-[var(--background)]" />
                  </div>
                  <div>
                    <h2 className="text-[var(--text-primary)] text-2xl md:text-3xl font-bold mb-2">UPCOMING EVENTS</h2>
                    <p className="text-[var(--text-secondary)] text-lg">Check out our events page for the latest underground happenings</p>
                  </div>
                </div>
                
                <div className="border-t border-[var(--border)] my-8"></div>
                
                <div className="space-y-6">
                  <p className="text-[var(--text-primary)] text-lg">
                    We host a variety of underground events throughout the year. Visit our events page to see the full lineup and secure your tickets before they sell out.
                  </p>
                  
                  <div className="bg-[var(--background)] rounded-lg p-6 border border-[var(--border)]">
                    <p className="text-[var(--text-accent)] font-medium mb-4">Why get tickets in advance?</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--text-accent)] font-bold">•</span>
                        <span className="text-[var(--text-secondary)]">Guaranteed entry to sold-out events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--text-accent)] font-bold">•</span>
                        <span className="text-[var(--text-secondary)]">Skip the line with priority access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[var(--text-accent)] font-bold">•</span>
                        <span className="text-[var(--text-secondary)]">Early bird discounts for early purchasers</span>
                      </li>
                    </ul>
                  </div>
                  
                  <Link 
                    to="/events" 
                    className="inline-flex items-center justify-center w-full bg-[var(--primary)] text-[var(--background)] py-4 px-6 rounded-md font-bold uppercase tracking-wider hover:bg-opacity-90 hover:bg-[var(--primary)] transition-colors group"
                  >
                    <span>View All Events</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-8 text-[var(--text-secondary)]"
            >
              <p>For group bookings or special arrangements, please contact us at <a href="mailto:events@underground.com" className="text-[var(--text-accent)] hover:underline">events@underground.com</a></p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Tickets

