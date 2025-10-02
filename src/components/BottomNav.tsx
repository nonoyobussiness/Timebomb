// src/components/BottomNav.tsx
import { NavLink } from "react-router-dom"
import { Home, Users, MessageCircle, PlusCircle, Flame } from "lucide-react"
import { motion } from "framer-motion"

const tabs = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/gossip", label: "Spill", icon: Flame },
  { to: "/messenger", label: "Chat", icon: MessageCircle },
  { to: "/create", label: "Create", icon: PlusCircle },
  { to: "/friends", label: "Friends", icon: Users },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex justify-around items-center bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] shadow-lg rounded-2xl px-4 py-2 backdrop-blur-glass">
        {tabs.map(({ to, label, icon: Icon }) => (
          <li key={to} className="relative mx-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors duration-200 ${
                  isActive
                    ? "text-[hsl(var(--primary-foreground))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--secondary))] to-[hsl(var(--tertiary))] shadow-glow"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center">
                    <Icon className="h-5 w-5 mb-1" />
                    <span>{label}</span>
                  </div>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
