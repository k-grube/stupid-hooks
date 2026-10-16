import { useCallback, useRef } from 'react'
import type { MouseEvent } from 'react'

const DOUBLE_CLICK_MS = 300

export function useDoubleRightClick<T extends Element = Element>(
  handler: (event: MouseEvent<T>) => void,
) {
  const lastAt = useRef(0)

  const onContextMenu = useCallback(
    (event: MouseEvent<T>) => {
      // native menu on click one swallows click two, so every right click is blocked
      event.preventDefault()
      const now = Date.now()
      if (now - lastAt.current <= DOUBLE_CLICK_MS) {
        lastAt.current = 0
        handler(event)
        return
      }
      lastAt.current = now
    },
    [handler],
  )

  return { onContextMenu }
}
