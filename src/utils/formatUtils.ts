import type { Transaction } from "../types";

// Formatar o valor como moeda brasileira (R$)
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Formatar a data (AAAA-MM-DD para DD/MM/AAAA)
export const formatDateToBR = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC'
  });
};

// Formatar "YYYY-MM" para "Mês/Ano" (usada no filtro)
export const formatMonth = (monthStr: string): string => {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  date.setHours(12); // Correção do fuso horário

  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
};

// Função Helper para obter o Mês Inicial (usada no filtro)
export const getInitialMonth = (transactions: Transaction[]): string => {
  if (transactions.length === 0) {
    return '';
  }
  
  const latestTransaction = transactions.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, transactions[0]); 
  
  return latestTransaction.date.substring(0, 7);
};