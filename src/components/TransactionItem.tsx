import type { Transaction } from '../types';
import { formatCurrency, formatDateToBR } from '../utils/formatUtils';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, onDelete }: TransactionItemProps) => {
  const isExpense = transaction.type === 'expense';

  const formattedAmount = formatCurrency(transaction.amount);

  const formattedDate = formatDateToBR(transaction.date);

  return (
    <div className={`transaction-item ${isExpense ? 'expense' : 'income'}`}>
      <span className='transaction-description'>{transaction.description}</span>
      <span className='transaction-date'>{formattedDate}</span>
      <span className='transaction-amount'>
        {isExpense ? '-' : '+'} {formattedAmount}
      </span>
      <button
        className='delete-btn'
        onClick={() => onDelete(transaction.id)}
        aria-label={`Deletar transação: ${transaction.description}`}>
        &times;
      </button>
    </div>
  );
};

export default TransactionItem;
