function CustomInput({ type, label, value, placeholder = "", onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={label} className="font-bold text-md">{label}</label>
        <input
          className="px-2 py-2 w-full focus:outline-none focus:border-none rounded-lg mt-2  border border-indigo-500 focus:ring-2 focus:ring-indigo-600 transition-all duration-500"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default CustomInput;
