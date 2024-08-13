"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid  } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Kontener przyjmujący liczbę krajów i rysujący poziomy wykres słupkowy
function HorizontalBarChart({ value }) {
    const maxCountries = 239;
    const chartData = [
        { label: "Countries", count: value , max: maxCountries},
    ];

    const chartConfig = {
        count: {
            label: "Count",
            color: "hsl(var(--primary))",
        },
    };

    return (
        <ChartContainer config={chartConfig} className="h-5 w-full">
            <BarChart
                data={chartData}
                layout="vertical"
                margin={{ left: -60 }}
            >
                
                <XAxis type="number" domain={[0, maxCountries]} hide />
                <YAxis
                    // dataKey="label"
                    type="category"
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                    // tickFormatter={(value) => value.slice(0, 3)}
                />
                <CartesianGrid vertical={false} />
                {/* <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                /> */}
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={5} stackId="a"/>
                <Bar dataKey="max" fill="hsl(var(--secondary))" radius={5} stackId="a"/>

            </BarChart>
        </ChartContainer>
    );
}

export default HorizontalBarChart;
