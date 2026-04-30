import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusion de classes Tailwind sans conflits (tailwind-merge).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
