import { useState } from "react";
import TransactionsTable from "./transactionsTable";



export default function Transaction() {
  const [year] = useState(() => new Date().getFullYear());
  const [month] = useState(() => new Date().getMonth() + 1);

  return (
    <div>
      <h1>Transactions</h1>
      <TransactionsTable year={year} month={month} />
    </div>
  );
}
