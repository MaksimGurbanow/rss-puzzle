const state = <T>(initialValue: T): [T, (newValue: T) => void] => {
  let value = initialValue;

  const setValue = (newValue: T) => {
    value = newValue;
  };

  return [value, setValue];
};

export default state;
