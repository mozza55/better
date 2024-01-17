export const isEmpty = (value: unknown): value is undefined | null => {
  return (
    (typeof value !== 'number' && value === '') ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0)
  );
};

export const paramsToObject = (searchParams: URLSearchParams) => {
  const obj = {} as any;
  searchParams.forEach(function (value, key) {
    obj[key] = value;
  });
  return obj;
};
