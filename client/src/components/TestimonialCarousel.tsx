import { useState, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  date: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Maria Gonzalez',
    date: 'December 2025',
    rating: 5,
    text: 'NexAir Comfort replaced our 15-year-old AC unit in the middle of July. They were out the next morning after I called, gave us a fair quote, and had the new system installed the same day. The difference is incredible and our electric bill dropped by 30%. Highly recommend!',
  },
  {
    id: 2,
    name: 'James Mitchell',
    date: 'January 2026',
    rating: 5,
    text: 'I signed up for their Silver membership plan and it has paid for itself twice over. The technician caught a refrigerant leak during a routine tune-up that would have been a $1,200 repair if it had gone unnoticed. Professional, honest, and thorough every single time.',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    date: 'November 2025',
    rating: 5,
    text: 'Our heater stopped working at 2 AM on a freezing night with a newborn in the house. NexAir had someone at our door within an hour. The tech diagnosed the issue quickly, had the part on his truck, and had us warm again by 4 AM. True lifesavers.',
  },
  {
    id: 4,
    name: 'David Park',
    date: 'October 2025',
    rating: 5,
    text: 'We had mini-splits installed in our garage conversion and guest casita. The NexAir team was incredibly professional from the estimate through final installation. Clean work, great communication, and the zones work perfectly. Best contractor experience in Arizona.',
  },
  {
    id: 5,
    name: 'Linda Ramirez',
    date: 'February 2026',
    rating: 5,
    text: 'The Nuve monitoring system is a game-changer. I got an alert on my phone that my AC filter was getting clogged before I even noticed a difference in airflow. Scheduled a filter change through the app and it was done the next day. This is how HVAC service should work.',
  },
]

export default function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 360
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    // Delay check to let scroll animation settle
    setTimeout(checkScroll, 350)
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:scale-110"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-medium)',
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>

      <button
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none hover:scale-110"
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-medium)',
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonials.map((review) => (
          <div
            key={review.id}
            className="snap-start flex-shrink-0 w-[320px] md:w-[360px] rounded-2xl p-6 transition-all duration-300 hover:border-[var(--border-medium)]"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]"
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-5">
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Customer Info */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                {review.name}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Hide scrollbar with CSS */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
