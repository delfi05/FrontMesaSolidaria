export const Text = ({ children, color_children, variant, width, heigth,
  margin_x, margin_y, padding_y, padding_x,
  font_style, text_position, text_size, text_case, text_shadow, letter_spacing,
  position, top, left, text_transform, text_translate, onClick
}) => {

  const Element = variant === "paragraph" ? "p" : "h2"
  return (
    <Element className={`${color_children ?? ""}
                         ${width ?? "w-full"} ${heigth ?? ""}
                         ${margin_x ?? "mx-auto"} ${margin_y ?? "my-auto"}
                         ${padding_x ?? ""} ${padding_y ?? ""}
                         ${font_style ?? "font-oswald"}
                         ${text_position ?? "text-center"} ${text_size ?? ""} ${text_case ?? ""} ${letter_spacing ?? ""}
                         ${position ?? ""} ${top ?? ""} ${left ?? ""} ${text_transform ?? ""} ${text_translate ?? ""} 
                  `}
      style={text_shadow} onClick={onClick}>
      {children}
    </Element>
  )
}