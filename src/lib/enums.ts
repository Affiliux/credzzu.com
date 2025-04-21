// Enums

export enum SubscriptionStatusEnum {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  PENDING_CANCELLATION = 'PENDING_CANCELLATION',
  NO_EXIST = 'NO_EXIST',
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
  PENDING = 'PENDING',
}

export enum DebtFeesTypeEnum {
  SIMPLE = 'simple',
  COMPOUND = 'compound',
}
