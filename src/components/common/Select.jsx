function Select({
  options = [],
  labelKey,
  valueKey,
  placeholder = "Chon",
  ...props
}) {
  return (
    <select {...props}>
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
