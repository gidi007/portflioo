"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import NavBar from "../components/layout/NavBar"  

interface Event {
  id: number
  title: string
  subtitle: string
  date: string
  time: string
  venue: string
  location: string
  image: string
  status: "upcoming" | "past"
  category: string
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all")

  const events: Event[] = [
    {
      id: 1,
      title: "STREETWEAR EDITION RE2URN",
      subtitle: "Fashion meets underground music",
      date: "2024-05-24",
      time: "09:00 PM",
      venue: "The Clubhouse",
      location: "Landmark Towers, V.I",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3CLesXP1ji9ExuU0vL7QiUP19EPiUo.png",
      status: "past",
      category: "Special Edition",
    },
    {
      id: 2,
      title: "WET & WILD",
      subtitle: "Summer pool party vibes",
      date: "2024-03-28",
      time: "06:00 PM",
      venue: "The Clubhouse",
      location: "Landmark, V.I",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3CLesXP1ji9ExuU0vL7QiUP19EPiUo.png",
      status: "past",
      category: "Pool Party",
    },
    {
      id: 3,
      title: "AFTER HOURS",
      subtitle: "Late night underground sessions",
      date: "2024-01-31",
      time: "07:00 PM",
      venue: "Hard Rock Cafe",
      location: "V.I, Lagos",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3CLesXP1ji9ExuU0vL7QiUP19EPiUo.png",
      status: "past",
      category: "After Hours",
    },
    {
      id: 4,
      title: "BASEMENT FRIDAY: BASS NATION",
      subtitle: "Weekly underground experience",
      date: "2024-12-06",
      time: "10:00 PM",
      venue: "The Underground",
      location: "Downtown Lagos",
      image: "/placeholder.svg?height=400&width=600",
      status: "upcoming",
      category: "Basement Friday",
    },
    {
      id: 5,
      title: "NEW YEAR UNDERGROUND",
      subtitle: "Ring in 2025 underground style",
      date: "2024-12-31",
      time: "11:00 PM",
      venue: "Secret Location",
      location: "Lagos",
      image: "/placeholder.svg?height=400&width=600",
      status: "upcoming",
      category: "Special Edition",
    },
  ]

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true
    return event.status === filter
  })

  return (
    <>
      <NavBar />
      <main className="bg-[var(--background)] pt-24">
        {/* Back to Home */}
        <div className="container-fluid py-4">
          <Link to="/" className="inline-flex items-center text-subtle hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span className="text-sm uppercase font-bold">Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <section className="container-fluid py-16">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-primary text-4xl md:text-6xl font-bold">ALL EVENTS</h1>
            <p className="text-secondary text-lg md:text-xl">Past and upcoming underground experiences</p>

            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              {["all", "upcoming", "past"].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as typeof filter)}
                  className={`px-6 py-2 rounded-full uppercase font-bold text-sm transition-all duration-300 ${
                    filter === filterOption
                      ? "bg-[var(--primary)] text-[var(--background)]"
                      : "border border-[var(--foreground)]/20 text-secondary hover:border-[var(--primary)] hover:text-accent"
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Events Grid */}
        <section className="container-fluid py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-[var(--muted)] rounded-lg overflow-hidden">
                  {/* Event Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          event.status === "upcoming" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="space-y-2">
                        <span className="text-highlight text-xs font-bold uppercase">{event.category}</span>
                        <h3 className="text-white text-xl font-bold group-hover:text-accent transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-white/80 text-sm">{event.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center text-secondary">
                      <Calendar className="h-4 w-4 mr-3 text-accent" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-secondary">
                      <Clock className="h-4 w-4 mr-3 text-accent" />
                      <span className="text-sm">{event.time}</span>
                    </div>

                    <div className="flex items-center text-secondary">
                      <MapPin className="h-4 w-4 mr-3 text-accent" />
                      <span className="text-sm">
                        {event.venue}, {event.location}
                      </span>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      {event.status === "upcoming" ? (
                        <button className="w-full bg-[var(--primary)] text-[var(--background)] py-3 rounded-lg font-bold hover:bg-[var(--primary)]/90 transition-colors">
                          GET TICKETS
                        </button>
                      ) : (
                        <button className="w-full border border-[var(--foreground)]/20 text-muted py-3 rounded-lg font-bold hover:border-accent hover:text-accent transition-colors">
                          VIEW RECAP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-primary text-2xl font-bold mb-4">No events found</h3>
              <p className="text-muted">Try adjusting your filter or check back later</p>
            </motion.div>
          )}
        </section>
      </main>

    </>
  )
}

export default Events
