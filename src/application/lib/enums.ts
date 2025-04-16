// Enums

export enum SubscriptionStatusEnum {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
}

export enum PlanRecurrenceEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum AlertStatusEnum {
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
}

export enum DebtStatusEnum {
  ACTIVE = 'ACTIVE',
  OVERDUE = 'OVERDUE',
  PAID = 'PAID',
}

export enum DebtFeesTypeEnum {
  SIMPLE = 'simple',
  COMPOUND = 'compound',
}
