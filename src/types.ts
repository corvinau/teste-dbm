export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export interface SummaryData {
  balance: number;
  income: number;
  expense: number;
}