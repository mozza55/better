export const isEmpty = (value: unknown): value is undefined | null => {
  return (
    (typeof value !== 'number' && value === '') ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0)
  );
};
