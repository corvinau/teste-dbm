import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import type { SummaryData } from '../../types';
import { formatCurrency } from '../../utils/formatUtils';

interface SummaryChartsProps {
  summary: SummaryData;
}

const COLORS = ['#4CAF50', '#F44336']; // Verde para Receita, Vermelho para Despesa

const SummaryCharts = ({ summary }: SummaryChartsProps) => {
  const data = [
    { name: 'Receitas', value: summary.income },
    { name: 'Despesas', value: summary.expense },
  ];

  return (
    <div className='charts-container'>
      <h3>Distribuição Financeira</h3>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label>
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryCharts;
