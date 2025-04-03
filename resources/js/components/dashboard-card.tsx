import { TrendingUpIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function DashboardCard() {
    return (
        <Card className="h-full border-none bg-none shadow-none">
            <CardHeader className="relative">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">$1,250.00</CardTitle>
                <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                        <TrendingUpIcon className="size-3" />
                        +12.5%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                    Trending up this month <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">Visitors for the last 6 months</div>
            </CardFooter>
        </Card>
    );
}
