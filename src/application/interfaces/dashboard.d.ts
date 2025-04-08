/**
 *
 * @name Dashboard
 * @category Interfaces - Dashboard - Dashboard
 *
 */

export interface DashboardProps {
  totalBorrowed: number;
  totalReceive: number;
  totalPaid: number;
  profitWithInterest: number;
  numDebtors: number;
  numOpenDebts: number;
  numDebtsPaid: number;
}

/**
 *
 * @name Alerts
 * @category Interfaces - Dashboard - Alerts
 *
 */

export interface AlertsProps {
  id: string;
  status: string;
  dueDate: string;
  amount: number;
  debtorName: string;
  debtDescription: string;
  daysLate: number;
  daysUntilDue: number;
}
