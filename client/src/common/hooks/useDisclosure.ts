import { useState } from 'react'

type UseDisclosureProps = {
  defaultOpen?: boolean
}

export const useDisclosure = (options: UseDisclosureProps = {}) => {
  const { defaultOpen = false } = options

  const [open, setOpen] = useState(defaultOpen)

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onToggle = () => {
    setOpen(!open)
  }

  return {
    open,
    onOpen,
    onClose,
    onToggle,
  }
}
