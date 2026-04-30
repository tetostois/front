import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = {
  green: 'rgba(34, 197, 94, 0.85)',
  pink: 'rgba(236, 72, 153, 0.85)',
  sky: 'rgba(14, 165, 233, 0.85)',
  emerald: 'rgba(16, 185, 129, 0.85)',
  orange: 'rgba(249, 115, 22, 0.85)',
  indigo: 'rgba(99, 102, 241, 0.85)',
  slate: '#64748b',
  grid: 'rgba(148, 163, 184, 0.2)',
  text: '#0f172a',
};

/**
 * Graphiques Chart.js pour le dashboard admin (données /admin/dashboard).
 */
export default function AdminDashboardCharts({ data, isFrench }) {
  const commonOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: COLORS.text, font: { family: 'Inter, system-ui, sans-serif' } },
        },
      },
      scales: {
        x: {
          grid: { color: COLORS.grid },
          ticks: { color: COLORS.text, maxRotation: 45, minRotation: 0 },
        },
        y: {
          grid: { color: COLORS.grid },
          ticks: { color: COLORS.text, precision: 0 },
          beginAtZero: true,
        },
      },
    }),
    []
  );

  const barData = useMemo(
    () => ({
      labels: isFrench
        ? ['Étudiants', 'Professeurs (actifs)', 'Modules (actifs)', 'Chapitres', 'QCM validés', 'Questions']
        : ['Students', 'Teachers (active)', 'Modules (active)', 'Chapters', 'QCMs', 'Questions'],
      datasets: [
        {
          label: isFrench ? 'Indicateurs' : 'Indicators',
          data: [
            Number(data?.etudiantInscrit) || 0,
            Number(data?.profActif) || 0,
            Number(data?.moduleActif) || 0,
            Number(data?.chapitreTotal) || 0,
            Number(data?.qcmValide) || 0,
            Number(data?.questionPose) || 0,
          ],
          backgroundColor: [
            COLORS.green,
            COLORS.pink,
            COLORS.sky,
            COLORS.emerald,
            COLORS.orange,
            COLORS.indigo,
          ],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    }),
    [data, isFrench]
  );

  const profDoughnut = useMemo(() => {
    const total = Math.max(0, Number(data?.profTotal) || 0);
    const actif = Math.min(total, Number(data?.profActif) || 0);
    const inactif = Math.max(0, total - actif);
    if (total === 0) {
      return {
        labels: [isFrench ? 'Aucune donnée' : 'No data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e2e8f0'],
            borderWidth: 0,
          },
        ],
      };
    }
    return {
      labels: isFrench
        ? ['Professeurs actifs', 'Non actifs / autres']
        : ['Active teachers', 'Inactive / other'],
      datasets: [
        {
          data: [actif, inactif],
          backgroundColor: ['#22c55e', '#e2e8f0'],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }, [data, isFrench]);

  const moduleDoughnut = useMemo(() => {
    const total = Math.max(0, Number(data?.moduleTotal) || 0);
    const actif = Math.min(total, Number(data?.moduleActif) || 0);
    const inactif = Math.max(0, total - actif);
    if (total === 0) {
      return {
        labels: [isFrench ? 'Aucune donnée' : 'No data'],
        datasets: [
          {
            data: [1],
            backgroundColor: ['#e2e8f0'],
            borderWidth: 0,
          },
        ],
      };
    }
    return {
      labels: isFrench
        ? ['Modules actifs', 'Modules inactifs']
        : ['Active modules', 'Inactive modules'],
      datasets: [
        {
          data: [actif, inactif],
          backgroundColor: ['#0ea5e9', '#e2e8f0'],
          borderColor: '#ffffff',
          borderWidth: 2,
        },
      ],
    };
  }, [data, isFrench]);

  const tauxBarData = useMemo(() => {
    const taux = Math.min(100, Math.max(0, Number(data?.tauxReuissite) || 0));
    return {
      labels: [isFrench ? 'Taux de réussite QCM' : 'QCM success rate'],
      datasets: [
        {
          label: '%',
          data: [taux],
          backgroundColor: 'rgba(34, 197, 94, 0.9)',
          borderRadius: 8,
          barThickness: 44,
        },
      ],
    };
  }, [data, isFrench]);

  const tauxBarOptions = useMemo(
    () => ({
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.parsed.x ?? ctx.raw}%`,
          },
        },
      },
      scales: {
        x: {
          min: 0,
          max: 100,
          grid: { color: COLORS.grid },
          ticks: {
            color: COLORS.text,
            callback: (value) => `${value}%`,
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: COLORS.text },
        },
      },
    }),
    []
  );

  const doughnutOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: COLORS.text, font: { family: 'Inter, system-ui, sans-serif', size: 11 } },
        },
      },
    }),
    []
  );

  const chartCardSx = {
    borderRadius: '1.5rem',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.06)',
    height: '100%',
  };

  const titleSx = {
    fontWeight: 700,
    color: '#0f172a',
    fontSize: '1.05rem',
    mb: 2,
    fontFamily: 'Inter, system-ui, sans-serif',
  };

  const chartBox = { height: 280, position: 'relative' };

  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      <Grid item xs={12} lg={7}>
        <Card sx={chartCardSx}>
          <CardContent>
            <Typography sx={titleSx}>
              {isFrench ? "Vue d'ensemble des indicateurs" : 'Key metrics overview'}
            </Typography>
            <Box sx={chartBox}>
              <Bar data={barData} options={commonOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Card sx={chartCardSx}>
          <CardContent>
            <Typography sx={titleSx}>
              {isFrench ? 'Répartition des professeurs' : 'Teachers distribution'}
            </Typography>
            <Box sx={{ ...chartBox, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut data={profDoughnut} options={doughnutOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={chartCardSx}>
          <CardContent>
            <Typography sx={titleSx}>
              {isFrench ? 'Répartition des modules' : 'Modules distribution'}
            </Typography>
            <Box sx={{ ...chartBox, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Doughnut data={moduleDoughnut} options={doughnutOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={chartCardSx}>
          <CardContent>
            <Typography sx={titleSx}>
              {isFrench ? 'Taux de réussite QCM' : 'QCM success rate'}
            </Typography>
            <Box sx={{ height: 140, position: 'relative' }}>
              <Bar data={tauxBarData} options={tauxBarOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
