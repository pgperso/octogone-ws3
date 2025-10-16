'use client';

import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Type pour les graphiques inline
type InlineChartType = {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  data: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
};

interface InlineChartProps {
  chart: InlineChartType;
}

export default function InlineChart({ chart }: InlineChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-4 p-4 rounded-xl"
      style={{ 
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--outline-variant)'
      }}
    >
      <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--on-surface)' }}>
        {chart.title}
      </h4>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === 'line' ? (
            <LineChart data={chart.data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BADFF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#BADFF6" stopOpacity={0.1}/>
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'var(--on-surface-variant)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--on-surface-variant)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
                domain={[1000, 3000]}
                tickFormatter={(value) => `${value}$`}
                width={70}
                ticks={[1000, 1500, 2000, 2500, 3000]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '12px',
                  color: 'var(--on-surface)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}
                formatter={(value) => [`${value}$`, 'Ventes']}
                labelFormatter={(label) => `${label} novembre`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#BADFF6" 
                strokeWidth={4}
                fill="url(#lineGradient)"
                dot={{ fill: '#BADFF6', strokeWidth: 3, r: 5, filter: 'url(#glow)' }}
                activeDot={{ r: 8, stroke: '#BADFF6', strokeWidth: 3, fill: '#fff' }}
                animationBegin={200}
                animationDuration={2500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          ) : chart.type === 'bar' ? (
            <BarChart data={chart.data}>
              <defs>
                {chart.data.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 10, fill: 'var(--on-surface-variant)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--on-surface-variant)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
                label={{ value: '%', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '12px',
                  color: 'var(--on-surface)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}
                formatter={(value) => [`${value}%`, 'Marge']}
              />
              <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]}
                animationBegin={300}
                animationDuration={2000}
                animationEasing="ease-out"
              >
                {chart.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#barGradient-${index})`}
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <defs>
                {chart.data.map((entry, index) => (
                  <linearGradient key={`pieGradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.color || '#BADFF6'} stopOpacity={1}/>
                    <stop offset="100%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={30}
                dataKey="value"
                label={(props: unknown) => {
                  const p = props as { percent?: number };
                  return p.percent ? `${(p.percent * 100).toFixed(0)}%` : '';
                }}
                labelLine={false}
                animationBegin={400}
                animationDuration={2500}
                animationEasing="ease-in-out"
              >
                {chart.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient-${index})`}
                    stroke={entry.color || '#BADFF6'}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--outline-variant)',
                  borderRadius: '12px',
                  color: 'var(--on-surface)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                }}
                formatter={(value) => [`${value}%`, 'Part']}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                wrapperStyle={{
                  fontSize: '12px',
                  color: 'var(--on-surface-variant)'
                }}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
