import type { LoginAuthType } from "./authTypes";

export interface ProfileFormType {
  currSavings: number;
  goalSavings: number;
  jobTitle: string;
  age: number;
  monthlyIncome: number;

}

export type UserDataType = LoginAuthType & ProfileFormType & {
  monthlyExpense: number | null
}
export type MoneyStatsProps = Pick<ProfileFormType, "monthlyIncome">

