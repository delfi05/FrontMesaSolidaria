export const Button = ({ children, id, type, bg_color, color, text_size,
  font_style, py, px, hover_bg, hover_text, width, height, margin_x, margin_y, rounded,
  icon, onClick, icond_position, iconWidth, iconHeight, text_wrap, disabled
 }) => {
  return (
    <button
      className={`${bg_color ?? "bg-secondary-s1"}
                  ${color ?? "text-white"}
                  ${font_style ?? "font-roboto"}
                  ${text_size ?? "text-sm"} uppercase ${text_wrap ?? "text-nowrap"}
                  ${width ?? ""} ${height ?? ""}
                  ${margin_x ?? ""} ${margin_y ?? ""}
                  ${py ?? "py-3"} ${px ?? "px-10"}
                  ${rounded ?? "rounded-md"}
                  ${hover_bg ?? "hover:bg-secondary-s2"} ${hover_text ?? "hover:text-white"}
                  flex justify-center items-center gap-2.5
                  cursor-pointer
                  shadow-xl
                  transition-all
                  `}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && (
        <figure className={`
              ${icond_position ?? ""}
              ${iconWidth ?? "w-3"}
              ${iconHeight ?? "h-3"}
              `}
        >
          {icon}
        </figure>
      )}
      {children}
    </button>
  )
}