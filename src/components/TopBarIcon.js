export const TopBarIcon = ({
  icon,
  label = 'label',
  tooltip = 'tooltip 💡',
}) => (
  <div
    className="relative flex items-center justify-center
        h-12 w-auto mt-2 mb-2 mx-auto px-3 bg-[#11366d50]  hover:bg-[#1c498c]
        text-[#537bb7] hover:text-[#4897ff]
        hover:rounded-xl rounded-3xl
        transition-all duration-300 ease-linear
        cursor-pointer shadow-xl group"
  >
    {icon}
    <span className="font-bold ml-1">{label}</span>
    {/* <span
          class="absolute w-auto p-2 m-2 min-w-max top-14 rounded-md shadow-md
        text-white bg-gray-900
        text-xs font-bold
        transition-all duration-100 scale-0 origin-left group-hover:scale-100"
        >
          {tooltip}
        </span> */}
  </div>
);
