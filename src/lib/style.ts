export const breakpoints = [481, 768, 992, 1200] as const;

export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export function rhythm(value: number) {
  return `${24 * value}px`;
}
