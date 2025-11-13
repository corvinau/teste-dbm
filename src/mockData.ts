import type { Transaction } from './types';

export const initialTransactions: Transaction[] = [
  // Novembro de 2025
  { 
    id: '1', 
    description: 'Salário Mensal', 
    amount: 5000.00, 
    type: 'income', 
    date: '2025-11-01T00:00:00.000Z' 
  },
  { 
    id: '2', 
    description: 'Aluguel', 
    amount: 1500.00, 
    type: 'expense', 
    date: '2025-11-05T00:00:00.000Z' 
  },
  { 
    id: '3', 
    description: 'Supermercado', 
    amount: 450.00, 
    type: 'expense', 
    date: '2025-11-12T00:00:00.000Z' 
  },
  
  // Outubro de 2025
  { 
    id: '5', 
    description: 'Restituição Imposto', 
    amount: 500.00, 
    type: 'income', 
    date: '2025-10-08T00:00:00.000Z' 
  },
  { 
    id: '6', 
    description: 'Conta de Luz', 
    amount: 180.00, 
    type: 'expense', 
    date: '2025-10-15T00:00:00.000Z' 
  },
];