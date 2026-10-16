import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDoubleRightClick } from './useDoubleRightClick'

function Target({ onDouble }: { onDouble: () => void }) {
  const props = useDoubleRightClick(onDouble)
  return <div data-testid="target" {...props} />
}

function renderTarget() {
  const onDouble = vi.fn()
  const { getByTestId } = render(<Target onDouble={onDouble} />)
  return { onDouble, target: getByTestId('target') }
}

describe('useDoubleRightClick', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('fires on two right clicks within 300ms', () => {
    const { onDouble, target } = renderTarget()
    fireEvent.contextMenu(target)
    vi.advanceTimersByTime(300)
    fireEvent.contextMenu(target)
    expect(onDouble).toHaveBeenCalledTimes(1)
  })

  it('ignores two right clicks more than 300ms apart', () => {
    const { onDouble, target } = renderTarget()
    fireEvent.contextMenu(target)
    vi.advanceTimersByTime(301)
    fireEvent.contextMenu(target)
    expect(onDouble).not.toHaveBeenCalled()
  })

  it('needs two fresh clicks after firing', () => {
    const { onDouble, target } = renderTarget()
    fireEvent.contextMenu(target)
    fireEvent.contextMenu(target)
    fireEvent.contextMenu(target)
    expect(onDouble).toHaveBeenCalledTimes(1)
  })

  it('blocks the native context menu on every right click', () => {
    const { target } = renderTarget()
    expect(fireEvent.contextMenu(target)).toBe(false)
    vi.advanceTimersByTime(1000)
    expect(fireEvent.contextMenu(target)).toBe(false)
  })
})
