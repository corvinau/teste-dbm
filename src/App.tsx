import { useState, useMemo, useCallback } from 'react';

import type { Transaction, SummaryData } from './types';

import useNotification from './hooks/useNotification';

import Filter from './components/Filter/Filter';
import Card from './components/Card/Card';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionItem from './components/TransactionItem/TransactionItem';
import SummaryCharts from './components/SummaryCharts/SummaryCharts';
import Notification from './components/Notification/Notification';

import { formatMonth, getInitialMonth } from './utils/formatUtils';

import { initialTransactions } from './mockData';

import './App.css';

const App = () => {
  const { notification, showNotification } = useNotification();

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [selectedMonth, setSelectedMonth] = useState<string>(() =>
    getInitialMonth(initialTransactions)
  );

  const availableMonths = useMemo(() => {
    const months = transactions.map((t) => t.date.substring(0, 7));

    return Array.from(new Set(months)).sort().reverse();
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((t) =>
      t.date.startsWith(selectedMonth)
    );

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions, selectedMonth]);

  const summary: SummaryData = useMemo(() => {
    const income = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [filteredTransactions]);

  const addTransaction = useCallback(
    (newTransactionData: Omit<Transaction, 'id'>) => {
      const newTransaction: Transaction = {
        ...newTransactionData,
        id: Date.now().toString(),
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      showNotification(
        `"${newTransaction.description}" adicionado com sucesso!`
      );

      const newMonth = newTransaction.date.substring(0, 7);
      if (newMonth !== selectedMonth) {
        setSelectedMonth(newMonth);
      }
    },
    [selectedMonth, showNotification]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      showNotification('Transação removida.', 'error');
    },
    [showNotification]
  );

  return (
    <div className='app-container'>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <header className='app-header'>
        <h1>Minhas Finanças</h1>
      </header>

      <section className='filter-section'>
        <Filter
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </section>

      <div className='dashboard-content'>
        <section className='summary-cards'>
          <Card title='Saldo Total' value={summary.balance} type='balance' />
          <Card title='Receitas' value={summary.income} type='income' />
          <Card title='Despesas' value={summary.expense} type='expense' />
        </section>

        <section className='transaction-form-area'>
          <h2>Nova Transação</h2>
          <TransactionForm onAddTransaction={addTransaction} />
        </section>

        <section className='main-area'>
          <div className='transaction-list-area'>
            <h2>
              Extrato -{' '}
              {selectedMonth ? formatMonth(selectedMonth) : 'Carregando...'}
            </h2>
            {filteredTransactions.length === 0 ? (
              <p className='no-transactions'>
                Nenhuma transação registrada para este mês.
              </p>
            ) : (
              <div className='transaction-list'>
                {filteredTransactions.map((t) => (
                  <TransactionItem
                    key={t.id}
                    transaction={t}
                    onDelete={deleteTransaction}
                  />
                ))}
              </div>
            )}
          </div>

          <div className='charts-section'>
            <SummaryCharts summary={summary} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
