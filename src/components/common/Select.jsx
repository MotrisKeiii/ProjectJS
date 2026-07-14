function Select({
  options = [],
  labelKey,
  valueKey,
  value,
  placeholder = "-- Chọn --",
  ...props
}) {
  return (
    <select value={value ?? ""} {...props}>
      <option value="">{placeholder}</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}

export default Select;
