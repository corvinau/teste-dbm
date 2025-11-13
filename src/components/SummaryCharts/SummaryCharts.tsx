import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  type PieLabelRenderProps,
} from 'recharts';
import type { SummaryData } from '../../types';
import { formatCurrency } from '../../utils/formatUtils';

interface SummaryChartsProps {
  summary: SummaryData;
}

const RADIAN = Math.PI / 180;
const COLORS = ['#69f0ae', '#ff5252'];

const SummaryCharts = ({ summary }: SummaryChartsProps) => {
  const data = [
    { name: 'Receitas', value: summary.income },
    { name: 'Despesas', value: summary.expense },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }: PieLabelRenderProps) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        fill={COLORS[index % COLORS.length]}>
        {formatCurrency(value)}
      </text>
    );
  };

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
            fill='#e0e0e0'
            label={renderCustomizedLabel}>
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
