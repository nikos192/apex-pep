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
    <div className="space-y-1 border border-brand-400 rounded-xl overflow-hidden shadow-card">
      {items.map((item, index) => (
        <div key={index} className="border-b border-brand-300 last:border-b-0">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-brand-100 transition-colors text-left"
          >
            <h3 className="font-bold text-brand-900 text-lg">{item.title}</h3>
            <span
              className={`text-brand-primary transition-transform duration-300 text-lg font-bold ${
                openIndex === index ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          {openIndex === index && (
            <div className="px-6 py-5 bg-brand-200 text-brand-700 leading-relaxed border-t border-brand-300">
              {item.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
