import { Transition } from "@headlessui/react";
import { useError } from "context/ErrorContext";

export const ErrorBanner = () => {
  const { error, clearError } = useError();

  return (
    <Transition
      show={!!error}
      enter="transition-all duration-300 ease-out"
      enterFrom="-translate-y-30 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition-all duration-300 ease-in"
      leaveFrom="translate-y-0 opacity-100"
      leaveTo="-translate-y-30 opacity-0"
    >
      <div
        role="alert"
        aria-live="assertive"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[999] w-96 p-4 bg-red-100 text-red-700 rounded-xl shadow-xl"
      >
        <span>{error}</span>
        <button
          type="button"
          aria-label="Dismiss error message"
          onClick={clearError}
          className="absolute top-1 right-2 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </Transition>
  );
};
