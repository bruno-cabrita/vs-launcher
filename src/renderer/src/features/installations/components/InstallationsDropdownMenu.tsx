import { useTranslation } from "react-i18next"
import { PiCaretUpBold } from "react-icons/pi"
import { AnimatePresence, motion } from "motion/react"

import { useConfigContext, CONFIG_ACTIONS } from "@renderer/contexts/ConfigContext"

import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react"

function InstallationsDropdownMenu(): JSX.Element {
  const { t } = useTranslation()

  const { config, configDispatch } = useConfigContext()

  return (
    <Listbox
      value={config.lastUsedInstallation}
      onChange={() => {
        configDispatch({
          type: CONFIG_ACTIONS.SET_LAST_USED_INSTALLATION,
          payload: config.lastUsedInstallation
        })
      }}
    >
      {({ open }) => (
        <>
          <ListboxButton className="bg-zinc-850 shadow shadow-zinc-900 hover:shadow-none w-full flex items-center justify-between gap-2 rounded overflow-hidden">
            {config.installations.length < 1 || config.lastUsedInstallation === null ? (
              <div className="w-full flex flex-col items-center justify-between px-2 py-1">
                <span className="font-bold">{t("features.installations.noInstallationsAvailable")}</span>
                <span className="text-zinc-500 text-xs flex gap-1 items-center">{t("features.installations.noInstallationsAvailableSub")}</span>
              </div>
            ) : (
              <>
                {config.installations.map(
                  (current) =>
                    current.id === config.lastUsedInstallation!.id && (
                      <div key={current.id} className="w-full flex items-center justify-between px-2 py-1">
                        <span className="font-bold">{current.name}</span>
                        <div className="text-sm text-zinc-500 flex flex-col items-end justify-between">
                          <span>{current.version}</span>
                          <span>{t("features.mods.modsCount", { count: current.mods.length })}</span>
                        </div>
                      </div>
                    )
                )}
                <PiCaretUpBold className="text-sm text-zinc-500 shrink-0 mr-2 data-[open]:rotate-180" />
              </>
            )}
          </ListboxButton>
          <AnimatePresence>
            {open && (
              <ListboxOptions
                static
                as={motion.div}
                initial={{ height: 0 }}
                animate={{ height: "fit-content" }}
                exit={{ height: 0 }}
                anchor="top"
                className="w-[var(--button-width)] bg-zinc-850 shadow shadow-zinc-900 mt-1 rounded z-50"
              >
                <div className="flex flex-col max-h-80">
                  {config.installations.map((current) => (
                    <ListboxOption key={current.id} value={current}>
                      <div className="w-full flex items-center justify-between px-2 py-1">
                        <span className="font-bold">{current.name}</span>
                        <div className="text-sm text-zinc-500 flex flex-col items-end justify-between">
                          <span>{current.version}</span>
                          <span>{t("features.mods.modsCount", { count: current.mods.length })}</span>
                        </div>
                      </div>
                    </ListboxOption>
                  ))}
                </div>
              </ListboxOptions>
            )}
          </AnimatePresence>
        </>
      )}
    </Listbox>
  )
}

export default InstallationsDropdownMenu