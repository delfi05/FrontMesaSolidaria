export const Input = ({ type, name, placeholder, autoComplete, required, onChange, value, onClick,
  text_label, text_size, icon, color, accept,
  width, mx, my, px, py,
}) => {

  return (
    <label htmlFor={name} className={`${width ?? "w-full"}`}>
      {text_label && (
        <>
          <span className="text-black text-sm font-roboto capitalize">{text_label}</span>
          <span className="text-red-500 text-sm ml-2 font-roboto">*</span>
        </>
      )}
      <div className="relative">
        <input
          className={`${text_size ?? "text-xs"} ${color ?? "text-gray-accent-light-2"}
        ${mx ?? "mx-auto"} ${my ?? "my-auto"}
        ${px ?? "px-2.5"} ${py ?? "py-1"}
        w-full
        rounded-md
        border border-gray-400 border-solid
        outline-secondary-s1
        `}
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
          value={value}
          accept={accept}
        />
        {icon && (
          <span onClick={onClick} className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer">
            {icon}
          </span>
        )}
      </div>
    </label>
  )
}