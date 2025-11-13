import { formatCurrency } from '../../utils/formatUtils';

import './Card.css';

interface CardProps {
  title: string;
  value: number;
  type: 'balance' | 'income' | 'expense';
}

const Card = ({ title, value, type }: CardProps) => {
  let cardName = '';

  const formattedValue = formatCurrency(value);

  if (value === 0) {
    cardName = 'zero';
  }

  if (value > 0 && type === 'balance') {
    cardName = 'success';
  }

  if (value < 0 && type === 'balance') {
    cardName = 'error';
  }

  return (
    <div className={`card card-${cardName} card-${type}`}>
      <h3>{title}</h3>
      <p>{formattedValue}</p>
    </div>
  );
};

export default Card;
