"use client";

import { useState } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.findIndex((item) => item.defaultOpen) ?? 0
  );

  return (
    <div className="space-y-1 border border-slate-200 rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="border-b border-slate-200 last:border-b-0">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <h3 className="font-semibold text-slate-900">{item.title}</h3>
            <span
              className={`text-slate-600 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-slate-50 text-slate-700 leading-relaxed border-t border-slate-200">
              {item.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
