import { useState, useMemo, useCallback } from 'react';
import type { Transaction, SummaryData } from './types';
import { initialTransactions } from './mockData';
import Filter from './components/Filter';
import Card from './components/Card';
import TransactionForm from './components/TransactionForm';
import TransactionItem from './components/TransactionItem';
import SummaryCharts from './components/SummaryCharts';
import { formatMonth, getInitialMonth } from './utils/formatUtils';

import './App.css';

const App = () => {
  // Controle de estados
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [selectedMonth, setSelectedMonth] = useState<string>(() =>
    getInitialMonth(initialTransactions)
  );

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Lógica para extrair meses únicos para o filtro
  const availableMonths = useMemo(() => {
    const months = transactions.map((t) => t.date.substring(0, 7));

    return Array.from(new Set(months)).sort().reverse();
  }, [transactions]);

  // Transações filtradas
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((t) =>
      t.date.startsWith(selectedMonth)
    );

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions, selectedMonth]);

  const showNotification = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Lógica de cálculo
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
    [selectedMonth]
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showNotification('Transação removida.', 'error');
  }, []);

  return (
    <div className='app-container'>
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <header className='app-header'>
        <h1>Minhas Finanças 💰</h1>
      </header>

      <section className='filter-section'>
        <Filter
          availableMonths={availableMonths}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </section>

      <div className='dashboard-content'>
        {/* Cards */}
        <section className='summary-cards'>
          <Card title='Saldo Total' value={summary.balance} type='balance' />
          <Card title='Receitas' value={summary.income} type='income' />
          <Card title='Despesas' value={summary.expense} type='expense' />
        </section>

        {/* Gráficos */}
        <section className='charts-section'>
          <SummaryCharts summary={summary} />
        </section>

        <section className='main-area'>
          {/* Formulário de Adição */}
          <div className='transaction-form-area'>
            <h2>Nova Transação</h2>
            <TransactionForm onAddTransaction={addTransaction} />
          </div>

          {/* Lista de Transações */}
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
        </section>
      </div>
    </div>
  );
};

export default App;
