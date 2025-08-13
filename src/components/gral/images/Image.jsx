export const Image = ({ image, altImage, width, height, margin_x, margin_y, borderTopLeftRadius, borderTopRightRadius, position, top, bottom, left, z_index, blur, objectFit, objectPosition }) => {
  return (
    <figure className={`${width ?? "w-full"} ${height ?? "h-auto"}
                        ${margin_x ?? "mx-auto"} ${margin_y ?? "my-0"}
                        ${position ?? "relative"} ${top ?? 'top-0'} ${left ?? 'left-0'} ${bottom ?? ""}
                        ${z_index ?? "z-0"} object-top
                      `}>
      <img src={image} alt={altImage} style={{filter: blur, objectFit: objectFit, objectPosition: objectPosition, borderTopLeftRadius: borderTopLeftRadius, borderTopRightRadius: borderTopRightRadius}}/>
    </figure>
  )
}