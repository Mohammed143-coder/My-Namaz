"use client";

/**
 * Reusable RadioButton Component
 * @param {string} label - The label text for the radio button
 * @param {boolean} checked - Whether the radio button is checked
 * @param {function} onChange - Callback function when radio button is toggled
 * @param {string} className - Additional CSS classes
 * @param {string} name - Name attribute for the radio input
 */
const RadioButton = ({
  label,
  checked = false,
  onChange,
  className = "",
  name = "radio",
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600 cursor-pointer"
        name={name}
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default RadioButton;
