"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign } from "lucide-react";

const ROICalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number | string>("");
  const [revenue, setRevenue] = useState<number | string>("");
  const [costs, setCosts] = useState<number | string>("");
  const [roi, setRoi] = useState<string | null>(null);

  const calculateROI = () => {
    const investment = parseFloat(initialInvestment as string);
    const totalRevenue = parseFloat(revenue as string);
    const totalCosts = parseFloat(costs as string);

    if (isNaN(investment) || isNaN(totalRevenue) || isNaN(totalCosts) || investment === 0) {
      setRoi("Please enter valid numbers for all fields, and initial investment cannot be zero.");
      return;
    }

    const netProfit = totalRevenue - totalCosts - investment;
    const calculatedRoi = (netProfit / investment) * 100;
    setRoi(calculatedRoi.toFixed(2) + "%");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-green-400">
            <Calculator className="h-6 w-6 text-green-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
              ROI Calculator
            </span>
          </CardTitle>
          <p className="text-muted-foreground text-green-300/70">
            Calculate the Return on Investment for your projects.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment" className="text-green-300">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="e.g., 10000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-100 focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue" className="text-green-300">Total Revenue ($)</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="e.g., 15000"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-100 focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costs" className="text-green-300">Total Costs ($)</Label>
              <Input
                id="costs"
                type="number"
                placeholder="e.g., 2000"
                value={costs}
                onChange={(e) => setCosts(e.target.value)}
                className="bg-gray-800/50 border-green-500/30 text-green-100 focus:ring-2 focus:ring-green-500/50"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={calculateROI} 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Calculate ROI
              </Button>
            </div>
          </div>

          {roi && (
            <div className="mt-6 p-4 bg-gray-800/70 border border-green-500/30 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-green-300">Calculated ROI:</h3>
              <p className="text-3xl font-bold text-green-400 mt-2">{roi}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;