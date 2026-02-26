import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import PromoBanner from './PromoBanner'

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <PromoBanner />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
