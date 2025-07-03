import { Brain, Mail, Github, Linkedin, Twitter, ExternalLink } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2 animate-slide-in-left">
            <div className="flex items-center mb-4 group">
              <Brain className="h-8 w-8 text-blue-400 mr-3 group-hover:animate-bounce-gentle transition-smooth" />
              <h3 className="text-lg font-semibold text-blue-400">IELTS AI Coach</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered IELTS preparation platform helping students achieve their target band scores through
              personalized practice and feedback.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-smooth hover-lift hover:animate-bounce-gentle"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-smooth hover-lift hover:animate-bounce-gentle"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-400 transition-smooth hover-lift hover:animate-bounce-gentle"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Dashboard", "Contact", "About", "FAQ", "Help"].map((link, index) => (
                <li key={link} className={`animate-slide-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-smooth flex items-center group"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-smooth" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="animate-slide-in-right">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Legal & Contact</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-smooth flex items-center group">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-smooth" />
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-smooth flex items-center group">
                  <ExternalLink className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-smooth" />
                  Privacy Policy
                </a>
              </li>
            </ul>
            <div className="text-gray-400">
              <p className="mb-2 text-blue-400 font-semibold">Contact Info:</p>
              <div className="flex items-center group cursor-pointer hover:text-blue-400 transition-smooth">
                <Mail className="h-4 w-4 mr-2 group-hover:animate-bounce-gentle" />
                <span>support@ieltscoach.ai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center animate-fade-in-up">
          <p className="text-gray-500">© 2025 IELTS AI Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
