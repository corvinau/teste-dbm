import React, { useState } from 'react';
import type { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

// Helper para obter a data de hoje no formato YYYY-MM-DD
const getTodayDate = () => new Date().toISOString().split('T')[0];

const TransactionForm = ({ onAddTransaction }: TransactionFormProps) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<TransactionType>('income');
  const [date, setDate] = useState<string>(getTodayDate());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || amount <= 0) return;

    onAddTransaction({
      description,
      amount,
      type,
      date,
    });

    setDescription('');
    setAmount(0);
    setType('income');
    setDate(getTodayDate());
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
        value={amount > 0 ? amount : ''}
        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
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
