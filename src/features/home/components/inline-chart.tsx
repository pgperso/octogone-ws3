'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { InlineChart as InlineChartType } from '../data/tools-conversations';

interface InlineChartProps {
  chart: InlineChartType;
  locale?: string;
}

export default function InlineChart({ chart, locale = 'fr' }: InlineChartProps) {
  // Convertir les données de label → name pour recharts
  const chartData = chart.data.map(item => ({
    name: item.label,
    value: item.value,
    color: item.color
  }));

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 p-5 rounded-xl w-full hover:shadow-xl transition-shadow"
      style={{ 
        backgroundColor: 'white',
        border: '1px solid var(--outline)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        cursor: 'pointer'
      }}
    >
      <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--on-secondary-container)' }}>
        {chart.title}
      </h4>
      
      <div className="w-full" style={{ height: '220px', minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === 'line' ? (
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#BADFF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#BADFF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: 'var(--on-secondary-container)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--on-secondary-container)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
                tickFormatter={(value) => `${value}$`}
                width={70}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#BADFF6" 
                strokeWidth={4}
                fill="url(#lineGradient)"
                dot={{ fill: '#BADFF6', strokeWidth: 3, r: 5 }}
                activeDot={{ r: 8, stroke: '#BADFF6', strokeWidth: 3, fill: '#fff' }}
                animationBegin={200}
                animationDuration={2500}
                animationEasing="ease-in-out"
              />
            </LineChart>
          ) : chart.type === 'bar' ? (
            <BarChart data={chartData}>
              <defs>
                {chartData.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.9}/>
                    <stop offset="95%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.6}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" strokeOpacity={0.3} />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12, fill: 'var(--on-secondary-container)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: 'var(--on-secondary-container)' }}
                axisLine={{ stroke: 'var(--outline-variant)' }}
                tickFormatter={(value) => `${value}$`}
              />
              <Bar 
                dataKey="value" 
                radius={[6, 6, 0, 0]}
                animationBegin={300}
                animationDuration={2000}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
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
                {chartData.map((entry, index) => (
                  <linearGradient key={`pieGradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={entry.color || '#BADFF6'} stopOpacity={1}/>
                    <stop offset="100%" stopColor={entry.color || '#BADFF6'} stopOpacity={0.7}/>
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={chartData}
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
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient-${index})`}
                    stroke={entry.color || '#BADFF6'}
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );

  return (
    <Link href={`/${locale}/fonctionnalites/octogone-360`}>
      {content}
    </Link>
  );
}
