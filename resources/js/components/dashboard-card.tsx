import { MoveRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface DashboardCardProps {
    title: string;
    value: string | number;
    percentageChange: string;
    description: string;
    trend: 'up' | 'down' | 'flat';
}
export default function DashboardCard({ title, description, trend, percentageChange, value }: DashboardCardProps) {
    return (
        <Card className="h-full border-none bg-none shadow-none">
            <CardHeader className="relative">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
                <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        {trend == 'up' ? (
                            <TrendingUpIcon className="size-3" />
                        ) : trend == 'down' ? (
                            <TrendingDownIcon className="size-3" />
                        ) : (
                            <MoveRightIcon className="size-3" />
                        )}
                        {percentageChange}
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex items-center gap-2 font-medium">
                    Trending {trend} this month{' '}
                    {trend == 'up' ? (
                        <TrendingUpIcon className="size-3" />
                    ) : trend == 'down' ? (
                        <TrendingDownIcon className="size-3" />
                    ) : (
                        <MoveRightIcon className="size-3" />
                    )}
                </div>
                <div className="text-muted-foreground">{description}</div>
            </CardFooter>
        </Card>
    );
}
