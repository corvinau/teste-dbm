import { formatMonth } from '../../utils/formatUtils';

import './Filter.css';

interface FilterProps {
  availableMonths: string[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const Filter = ({
  availableMonths,
  selectedMonth,
  onMonthChange,
}: FilterProps) => {
  return (
    <div className='filter-container'>
      <label htmlFor='month-select'>Visualizar mês:</label>
      <select
        id='month-select'
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        disabled={availableMonths.length === 0}>
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {formatMonth(month)}
          </option>
        ))}
        {availableMonths.length === 0 && (
          <option value=''>Nenhum mês disponível</option>
        )}
      </select>
    </div>
  );
};

export default Filter;
