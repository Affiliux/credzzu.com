import type { ReactNode } from "react";

export type ApplicationProviderProps = {
  children: ReactNode;
};

export type ApplicationContextType = {
  plans: PlanProps[];
  //
  onGetPlans: () => Promise<void>;
};
