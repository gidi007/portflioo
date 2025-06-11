import type { IconType } from "react-icons"

interface SocialLinkProps {
  href: string
  icon: IconType
  label: string
  customClasses?: string
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors group"
      aria-label={label}
    >
      <Icon className="h-5 w-5 text-yellow-400/70 group-hover:text-yellow-400 transition-colors" />
    </a>
  )
}

export default SocialLink

