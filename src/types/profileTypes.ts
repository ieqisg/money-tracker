
export interface ProfileFormType {
  firstName: string;
  lastName: string;
  currSavings: number;
  goalSavings: number;
  jobTitle: string;
  age: number;
  monthlyIncome: number;

}

export type MoneyStatsProps = Pick<ProfileFormType, "currSavings" | "goalSavings" | "monthlyIncome">

