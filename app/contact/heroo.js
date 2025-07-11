import { motion } from 'framer-motion';

export default function ContactHero() {
  return (
    <section className="w-full bg-white py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600">
          Have questions or need help? Fill out the form and we'll get back to you shortly.
        </p>
      </motion.div>
    </section>
  );
}
