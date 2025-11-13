import { formatCurrency } from '../../utils/formatUtils';

import './Card.css';

interface CardProps {
  title: string;
  value: number;
  type: 'balance' | 'income' | 'expense';
}

const Card = ({ title, value, type }: CardProps) => {
  const formattedValue = formatCurrency(value);

  const getStatusClass = () => {
    if (type === 'income' || type === 'expense') {
      return type;
    }
    if (value > 0) return 'success';
    if (value < 0) return 'error';
    return 'zero';
  };

  const statusClass = getStatusClass();

  return (
    <div className={`card card-${type} card-${statusClass}`}>
      <h3>{title}</h3>
      <p>{formattedValue}</p>
    </div>
  );
};

export default Card;
