import type * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-zinc-500 bg-transparent px-3 py-1 text-base text-zinc-400 shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-zinc-400 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-sm file:text-zinc-300 placeholder:text-zinc-300 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
        'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-zinc-400',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  )
}

export { Input }
