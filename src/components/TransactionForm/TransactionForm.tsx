import React, { useCallback, useState } from 'react';
import type { Transaction, TransactionType } from '../../types';

import './TransactionForm.css';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

// Helper para obter a data de hoje no formato YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [description, setDescription] = useState('');
  const [amountStr, setAmountStr] = useState<string>('');
  const [type, setType] = useState<TransactionType>('income');
  const [date, setDate] = useState<string>(getTodayDate());

  const resetForm = useCallback(() => {
    setDescription('');
    setAmountStr('');
    setType('income');
    setDate(getTodayDate());
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const amount = parseFloat(amountStr);

      if (!description.trim() || isNaN(amount) || amount <= 0) {
        console.error('Dados inválidos no formulário.');
        return;
      }

      onAddTransaction({
        description: description.trim(),
        amount,
        type,
        date,
      });

      resetForm();
    },
    [description, amountStr, type, date, onAddTransaction, resetForm]
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountStr(e.target.value);
  };

  return (
    <form className='transaction-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Descrição (ex: Aluguel, Salário)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type='number'
        placeholder='Valor'
        value={amountStr}
        onChange={handleAmountChange}
        step='0.01'
        min='0.01'
        required
      />
      <input
        type='date'
        placeholder='Data'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
        required>
        <option value='income'>Receita</option>
        <option value='expense'>Despesa</option>
      </select>
      <button type='submit'>Adicionar Transação</button>
    </form>
  );
};

export default TransactionForm;
