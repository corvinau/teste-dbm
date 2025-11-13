import { formatCurrency } from '../utils/formatUtils';

interface CardProps {
  title: string;
  value: number;
  type: 'balance' | 'income' | 'expense';
}

const Card = ({ title, value, type }: CardProps) => {
  const formattedValue = formatCurrency(value);

  return (
    <div className={`card card-${type}`}>
      <h3>{title}</h3>
      <p>{formattedValue}</p>
    </div>
  );
};

export default Card;
