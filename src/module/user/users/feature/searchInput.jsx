import PropTypes from 'prop-types';

const SearchInput = ({ id, label, value, onChange, placeholder }) => (
  <div className="flex items-center gap-1 w-full sm:w-auto">
    <div className="flex items-center gap-1 flex-1 sm:flex-none">
      <label
        htmlFor={id}
        className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap"
      >
        {label}:
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="w-full sm:w-32 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  </div>
);

SearchInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
