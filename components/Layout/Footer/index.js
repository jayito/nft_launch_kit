import Link from 'next/link'

const Footer = () => {
  return (
    <div className="pt-16 text-sm text-center md:text-left fade-in absolute bottom-4 md:bottom-4 lg:bottom-6 xl:bottom-12">
      <span className="text-gray-500 no-underline hover:no-underline">&copy; App 2022</span>
      - Created by
      <Link href="https://jayito.github.io">
        <a className="text-gray-500 no-underline hover:no-underline ml-2" target="_blank" rel="noreferrer">
          Jay Ito
        </a>
      </Link>
    </div>
  )
}

export default Footer;