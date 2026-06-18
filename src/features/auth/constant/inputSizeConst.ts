export const INPUT_LIMITS = {
  EMAIL: {
    MIN: 8,
    MAX: 254,
  },
  PASSWORD: {
    MIN: 8,
    MAX: 48,
  },
  NAME: {
    MIN: 2,
    MAX: 100,
  },
  VERIFICATION_CODE: {
    MIN: 6,
    MAX: 6,
  },
} as const;
