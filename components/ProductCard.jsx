"use client";

import React, { useTransition } from "react";
import { Trash2, ExternalLink, Loader2, Calendar } from "lucide-react";
import { deleteProduct } from "@/app/actions";

export function ProductCard({ product }) {
  const [isPending, startTransition] = useTransition();

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

  return (
    <div
      className={`group relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-gray-100 dark:border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-orange-100/80 dark:hover:border-orange-950/60 transition-all duration-300 hover:-translate-y-1 ${
        isPending ? "opacity-40 pointer-events-none scale-95" : ""
      }`}
    >
      <div>
        {/* Product Image Wrapper */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50/50 dark:bg-zinc-950/40 border border-gray-100/50 dark:border-zinc-900/60 flex items-center justify-center mb-4">
          {product.img_url ? (
            <img
              src={product.img_url}
              alt={product.name}
              className="object-contain w-full h-full p-3 group-hover:scale-[1.04] transition-transform duration-500 ease-out select-none"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                e.target.parentNode.querySelector(".fallback-icon").style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`fallback-icon w-full h-full flex items-center justify-center font-black text-4xl text-orange-200 dark:text-zinc-800 select-none bg-orange-50/30 dark:bg-zinc-950/20 ${
              product.img_url ? "hidden" : "flex"
            }`}
          >
            {product.name ? product.name.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        {/* Product Details */}
        <h4 className="text-gray-900 dark:text-gray-100 font-bold text-sm tracking-tight line-clamp-2 min-h-[40px] mb-2 leading-snug group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-200">
          {product.name}
        </h4>

        {/* Pricing Info */}
        <div className="flex items-baseline gap-1 mt-1 mb-2">
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {getCurrencySymbol(product.currency)}
            {product.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-xs font-semibold text-gray-400 uppercase">
            {product.currency}
          </span>
        </div>
      </div>

      {/* Footer Info & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-gray-100/60 dark:border-zinc-800/60 flex items-center justify-between">
        <span className="text-[11px] text-gray-400 dark:text-zinc-500 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Tracked: {formattedDate}</span>
        </span>

        <div className="flex items-center gap-2">
          {/* External Link */}
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View original product page"
            className="p-2 text-gray-400 hover:text-orange-500 dark:text-zinc-500 dark:hover:text-orange-400 bg-gray-50 hover:bg-orange-50 dark:bg-zinc-900 dark:hover:bg-orange-950/20 border border-gray-100 dark:border-zinc-800/60 rounded-lg hover:scale-105 transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isPending}
            title="Stop tracking product"
            className="p-2 text-gray-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 bg-gray-50 hover:bg-red-50 dark:bg-zinc-900 dark:hover:bg-red-950/20 border border-gray-100 dark:border-zinc-800/60 rounded-lg hover:scale-105 transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-500" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
