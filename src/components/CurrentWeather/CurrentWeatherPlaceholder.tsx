interface CurrentWeatherPlaceholderProps {
  loading: boolean;
}

const CurrentWeatherPlaceholder = ({
  loading,
}: CurrentWeatherPlaceholderProps) => {
  return (
    <>
      <div id="current-wrapper" className="flex flex-col mb-3 mt-10">
        <div className="backdrop-blur-sm p-5 rounded-2xl mb-3 shadow-md w-96 md:w-175">
          <div className="flex flex-col transition-width duration-300 ease-in w-86 md:w-160  bg-stone-50/70 rounded-2xl p-2 pb-10 mb-2 shadow-md self-center">
            <img
              src="/images/gooses/regularGoose.png"
              className="transition-width duration-300 ease-in w-40 md:w-70 self-center"
            />
          </div>
        </div>
        <div
          id="current-dialog"
          className="w-full flex flex-col relative items-center "
        >
          <svg
            height="100"
            width="75"
            className="justify-self-end absolute inset-x-20 -inset-y-15 z-10"
          >
            <polygon
              className="text-stone-50 fill-current"
              points="37.5,0 75,100 0,100"
            />
            Sorry, your browser does not support inline SVG.
          </svg>
          <div className="transition-height transition-width duration-300 ease-in w-90 md:w-150 md:min-h-20 h-auto bg-stone-50 rounded-3xl p-4 text-l md:text-xl shadow-xl relative md:inset-x-15 z-11">
            <p>
              {loading
                ? "Honk honk! Loading your weather."
                : "Honk! Sorry about that, try again later."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherPlaceholder;
