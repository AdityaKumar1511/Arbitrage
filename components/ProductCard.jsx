"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Trash2, ExternalLink, Loader2, LineChart as ChartIcon, ChevronDown, ChevronUp } from "lucide-react";
import { deleteProduct } from "@/app/actions";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export function ProductCard({ product }) {
  const [isPending, startTransition] = useTransition();
  const [showChart, setShowChart] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Safeguard Recharts rendering to prevent Next.js SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  const getCurrencySymbol = (code) => {
    switch (code?.toUpperCase()) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "GBP":
        return "£";
      case "INR":
        return "₹";
      case "JPY":
        return "¥";
      case "CAD":
        return "CA$";
      case "AUD":
        return "A$";
      default:
        return code || "₹";
    }
  };

  const handleDelete = () => {
    if (confirm(`Stop tracking "${product.name}"?`)) {
      startTransition(async () => {
        const result = await deleteProduct(product.id);
        if (!result.success) {
          alert(result.error || "Failed to remove product.");
        }
      });
    }
  };

  const formattedDate = product.updated_at
    ? new Date(product.updated_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  // Transform database price history for Recharts with a fallback to current price
  let rawHistory = product.price_history || [];
  if (rawHistory.length === 0) {
    rawHistory = [
      {
        price: product.current_price,
        currency: product.currency,
        checked_at: new Date(new Date(product.created_at || Date.now()).getTime() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      },
      {
        price: product.current_price,
        currency: product.currency,
        checked_at: product.updated_at || new Date().toISOString() // today
      }
    ];
  } else if (rawHistory.length === 1) {
    rawHistory = [
      {
        ...rawHistory[0],
        checked_at: new Date(new Date(rawHistory[0].checked_at).getTime() - 24 * 60 * 60 * 1000).toISOString()
      },
      rawHistory[0]
    ];
  }

  const chartData = rawHistory.map((h) => ({
    date: new Date(h.checked_at).toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    }),
    price: h.price,
    rawDate: new Date(h.checked_at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  // Premium, theme-friendly custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 p-2.5 rounded-xl shadow-md text-[11px] font-medium leading-normal">
          <p className="text-gray-400 dark:text-zinc-500">{payload[0].payload.rawDate}</p>
          <p className="text-orange-500 dark:text-orange-400 font-bold mt-0.5">
            Price: {getCurrencySymbol(product.currency)}
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`group relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-orange-100/80 dark:hover:border-orange-950/60 transition-all duration-300 flex flex-col justify-between ${
        isPending ? "opacity-40 pointer-events-none scale-95" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Left: Product Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50/50 dark:bg-zinc-950/40 border border-gray-100/50 dark:border-zinc-900/60 flex items-center justify-center self-center sm:self-start">
          {product.img_url ? (
            <img
              src={product.img_url}
              alt={product.name}
              className="object-contain w-full h-full p-2 group-hover:scale-[1.04] transition-transform duration-500 ease-out select-none"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentNode.querySelector(".fallback-icon").style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`fallback-icon w-full h-full flex items-center justify-center font-black text-3xl text-orange-200 dark:text-zinc-800 select-none bg-orange-50/30 dark:bg-zinc-950/20 ${
              product.img_url ? "hidden" : "flex"
            }`}
          >
            {product.name ? product.name.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        {/* Right: Content details */}
        <div className="flex-1 flex flex-col justify-between py-0.5">
          <div>
            <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm sm:text-base tracking-tight line-clamp-2 leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200">
              {product.name}
            </h4>
          </div>

          <div className="flex items-center justify-between mt-3 gap-2">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                {getCurrencySymbol(product.currency)}
                {product.current_price.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase ml-1">
                {product.currency}
              </span>
            </div>

            {/* Tracking Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50/50 dark:bg-orange-950/10 border border-orange-100/50 dark:border-orange-900/30 rounded-full text-[10px] font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400 animate-pulse" />
              <span>Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button Group Row */}
      <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-gray-100/60 dark:border-zinc-800/60 justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle Chart Button */}
          <button
            onClick={() => setShowChart(!showChart)}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg border flex items-center gap-1.5 transition-all duration-200 cursor-pointer select-none focus:outline-none ${
              showChart
                ? "bg-orange-500 border-orange-500 text-white shadow-xs"
                : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
            }`}
          >
            <ChartIcon className="h-3.5 w-3.5" />
            <span>{showChart ? "Hide Chart" : "Show Chart"}</span>
            {showChart ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>

          {/* View Product External Link */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-1.5 transition-all duration-200 select-none"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Product</span>
          </a>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-3.5 py-2 text-xs font-bold bg-red-50 hover:bg-red-100 dark:bg-red-950/10 dark:hover:bg-red-950/20 border border-red-100/50 dark:border-red-900/10 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-1.5 transition-all duration-200 cursor-pointer disabled:opacity-50 select-none"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
          <span>Remove</span>
        </button>
      </div>

      {/* Expanded Chart Section */}
      {showChart && (
        <div className="mt-5 p-4 bg-gray-50/50 dark:bg-zinc-950/20 border border-gray-100 dark:border-zinc-800/80 rounded-xl animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center justify-between mb-3 select-none">
            <h5 className="text-[11px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
              Price History
            </h5>
            <span className="text-[10px] font-medium text-gray-400 dark:text-zinc-500">
              Last updated: {formattedDate}
            </span>
          </div>

          {mounted && chartData.length > 0 ? (
            <div className="w-full h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120, 120, 120, 0.15)" />
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={5}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${getCurrencySymbol(product.currency)}${val}`}
                    dx={-5}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#f97316"
                    strokeWidth={2.5}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                    dot={{ r: 3, strokeWidth: 0, fill: "#f97316" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[160px] flex items-center justify-center text-xs text-gray-400 select-none">
              No historical data available.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
