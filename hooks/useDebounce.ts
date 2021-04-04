let timeout: any;

export default function useDebouce(callback: Function, wait: number) {
  const executedFunction = (...args: any) => {
    const later = () => {
      timeout = null;
      // Execute the callback
      callback(...args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };

  const cancelDebounce = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  return [executedFunction, cancelDebounce];
}
