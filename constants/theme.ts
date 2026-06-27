export const Colors = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#DBEAFE',
  secondary: '#0F172A',
  accent: '#059669',
  accentLight: '#D1FAE5',
  warning: '#D97706',
  warningLight: '#FEF3C7',
  danger: '#DC2626',
  dangerLight: '#FEE2E2',
  info: '#0284C7',
  infoLight: '#E0F2FE',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceHover: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',
  success: '#16A34A',
  successLight: '#DCFCE7',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Submitted: { bg: '#DBEAFE', text: '#1E40AF' },
  'Under Review': { bg: '#E0F2FE', text: '#0369A1' },
  Approved: { bg: '#D1FAE5', text: '#065F46' },
  Assigned: { bg: '#EDE9FE', text: '#5B21B6' },
  'In Progress': { bg: '#FEF3C7', text: '#92400E' },
  'Waiting for Tenant': { bg: '#FEF3C7', text: '#92400E' },
  'Waiting for Landlord': { bg: '#FFEDD5', text: '#9A3412' },
  Resolved: { bg: '#DCFCE7', text: '#166534' },
  Reopened: { bg: '#FEE2E2', text: '#991B1B' },
  Escalated: { bg: '#FEE2E2', text: '#991B1B' },
  Closed: { bg: '#F1F5F9', text: '#475569' },
  Rejected: { bg: '#FEE2E2', text: '#991B1B' },
};

export const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  Low: { bg: '#F1F5F9', text: '#475569' },
  Medium: { bg: '#FEF3C7', text: '#92400E' },
  High: { bg: '#FFEDD5', text: '#9A3412' },
  Emergency: { bg: '#FEE2E2', text: '#991B1B' },
};
