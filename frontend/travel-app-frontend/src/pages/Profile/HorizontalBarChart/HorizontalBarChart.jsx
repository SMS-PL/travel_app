import { useState, useEffect } from 'react';
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
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

// Kontener przyjmujący liczbę krajów i rysujący poziomy wykres słupkowy
function HorizontalBarChart({ value,  countriesLength}) {

    let updateValue;
    if (value == 0) {
        updateValue = 5;
    } else if (value < 109) {
        updateValue = value + 10;
    } else if (value == 110) {
        updateValue = value + 9;
    } else if (value == 111) {
        updateValue = value + 8;
    } else if (value == 112) {
        updateValue = value + 7;
    } else if (value == 113) {
        updateValue = value + 6;
    } else if (value == 114) {
        updateValue = value + 5;
    } else if (value == 115) {
        updateValue = value + 4;
    } else if (value == 116) {
        updateValue = value + 3;
    } else if (value == 117) {
        updateValue = value + 2;
    } else if (value == 118) {
        updateValue = value + 1;
    } else if (value >= 119) {
        updateValue = value;
    }

    const chartData = [
        { label: "Countries", count: updateValue , max: countriesLength},
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
                
                <XAxis type="number" domain={[0, !countriesLength ? 239 : countriesLength ]} hide />
                <YAxis
                    // dataKey="label"
                    type="category"
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                    // tickFormatter={(value) => value.slice(0, 3)}
                />
                <CartesianGrid vertical={false}/>
                {/* <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                /> */}
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={5} stackId="a" className="w-full"/>
                {/* <Bar dataKey="max" fill="hsl(var(--secondary))" radius={5} stackId="a"/> */}

            </BarChart>
        </ChartContainer>
    );
}

export default HorizontalBarChart;
