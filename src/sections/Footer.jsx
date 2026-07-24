import { motion } from 'framer-motion'
import { FiHeart, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi'
import VisitorCounter from '../components/VisitorCounter'
import { content } from '../data/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="position-relative py-5 bg-[#0f0c29] border-top border-white/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="d-flex justify-content-center gap-3">
            {[FiGithub, FiTwitter, FiInstagram].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <Icon />
              </motion.a>
            ))}
          </div>

          <p className="text-white/40 text-sm">
            Made with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block text-pink-400"
            >
              <FiHeart className="inline" />
            </motion.span>{' '}
            by{' '}
            <span className="text-gradient font-semibold">{content.sender}</span>
          </p>

          <p className="text-white/20 text-xs">
            &copy; {year} &bull; All rights reserved &bull; {content.name}
          </p>

          <div className="flex justify-center">
            <VisitorCounter />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/10 text-xs"
          >
            ✨ Every moment with you is a treasure ✨
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
