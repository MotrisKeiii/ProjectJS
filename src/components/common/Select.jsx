function Select({ options, labelKey, valueKey }) {
  return (
    <select>
      <option value="">-- Chọn --</option>
      {options.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </select>
  );
}
export default Select;
