import { TrendingUpIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface DashboardCardProps {
    title: string;
    value: string | number;
    percentageChange: string;
    description: string;
}
export default function DashboardCard({ title, description, percentageChange, value }: DashboardCardProps) {
    return (
        <Card className="h-full border-none bg-none shadow-none">
            <CardHeader className="relative">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
                <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUpIcon className="size-3" />
                        {percentageChange}
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Trending up this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">{description}</div>
            </CardFooter>
        </Card>
    );
}
