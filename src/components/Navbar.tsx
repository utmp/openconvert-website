import { FaGithub  } from 'react-icons/fa'
import {BsTwitterX } from 'react-icons/bs'
import logo from '../assets/icon.png'
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-sm z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src={logo} className='w-9 h-9'/>
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">
              OpenConvert
            </a>
          </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <a
              href="https://github.com/openconvert/openconvert-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/openconvert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <BsTwitterX  className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar