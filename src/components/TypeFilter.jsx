const TYPES = ['Painting', 'Print', 'Drawing', 'Photograph', 'Textile', 'Ceramic'];

export default function TypeFilter({ selected, onSelect }) {
  const options = [{ label: 'All', value: '' }, ...TYPES.map((type) => ({ label: `${type}s`, value: type }))];

  return (
    <div className="filters" role="group" aria-label="Filter by type" data-part="component" data-name="TypeFilter">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          className="chip"
          aria-pressed={selected === option.value}
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
