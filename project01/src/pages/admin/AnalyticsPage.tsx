import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { DollarSignIcon } from "~/components/Icons";
import { CreditCardIcon } from "~/components/Icons";
import { ActivityIcon } from "~/components/Icons";
import { UsersIcon } from "~/components/Icons";
import { useLoaderData } from "react-router-dom";

export default function AnalyticsPage() {
  const { totalRevenue, totalPercentage, ordersCount, usersCount, monthPercentage, monthRevenue } =
    useLoaderData() as {
      totalRevenue: number;
      totalPercentage: string;
      ordersCount: number;
      usersCount: number;
      monthPercentage: string;
      monthRevenue: number;
    };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}лв</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {totalPercentage} в сравнение с предния месец
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accounts</CardTitle>
            <UsersIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{usersCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <CreditCardIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{ordersCount}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue (This Month)</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthRevenue}лв</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {monthPercentage} в сравнение с предния месец
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue (Today)</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,345.67</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+25% compared to yesterday</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue (This Year)</CardTitle>
          <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$123,345.67</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">+5% compared to last year</p>
        </CardContent>
      </Card>
    </main>
  );
}
