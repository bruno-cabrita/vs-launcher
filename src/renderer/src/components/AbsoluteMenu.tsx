import { motion, AnimatePresence } from "motion/react"

/**
 * This menu has a width of 600px but height is not fixed so make sure to control the height manually
 */
function AbsoluteMenu({
  title,
  isMenuOpen,
  setIsMenuOpen,
  preventClose,
  children
}: {
  title: string
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  preventClose?: boolean
  children: React.ReactNode
}): JSX.Element {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          onClick={() => !preventClose && setIsMenuOpen(false)}
          className={`absolute w-full h-full top-0 left-0 flex items-center justify-center bg-zinc-950/90`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="w-[600px] flex flex-col items-center p-4 gap-4 bg-zinc-800 rounded-md shadow-xl shadow-zinc-950"
            initial={{ scale: 0.1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2 className="text-2xl font-bold">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AbsoluteMenu