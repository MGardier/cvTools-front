import type { IMetaItem, TTranslationFn } from "../types";

interface IMetadataStripProps {
  items: IMetaItem[];
  t: TTranslationFn;
}

export const MetadataStrip = ({ items, t }: IMetadataStripProps) => (
  <div className="mt-5">
    {/* Desktop */}
    <div className="hidden md:flex border border-slate-200 rounded-xl divide-x divide-slate-200">
      {items.map((item) => (
        <div key={item.labelKey} className="flex-1 flex flex-col items-center gap-1 py-4 px-3">
          <span className="text-xs text-slate-400">{t(item.labelKey)}</span>
          <span className="text-sm font-medium text-slate-700">{item.value}</span>
        </div>
      ))}
    </div>
    {/* Mobile — 2-col grid with last item full-width if odd */}
    <div className="md:hidden border border-slate-200 rounded-xl overflow-hidden">
      {items.length >= 2 && (
        <div className="grid grid-cols-2 divide-x divide-slate-200">
          {items.slice(0, 2).map((item) => (
            <div key={item.labelKey} className="flex flex-col items-center gap-1 py-3.5 px-3">
              <span className="text-xs text-slate-400">{t(item.labelKey)}</span>
              <span className="text-sm font-medium text-slate-700">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {items.length >= 4 && (
        <div className="border-t border-slate-200 grid grid-cols-2 divide-x divide-slate-200">
          {items.slice(2, 4).map((item) => (
            <div key={item.labelKey} className="flex flex-col items-center gap-1 py-3.5 px-3">
              <span className="text-xs text-slate-400">{t(item.labelKey)}</span>
              <span className="text-sm font-medium text-slate-700">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      {items.length >= 5 && (
        <div className="border-t border-slate-200 flex flex-col items-center gap-1 py-3.5 px-3">
          <span className="text-xs text-slate-400">{t(items[4].labelKey)}</span>
          <span className="text-sm font-medium text-slate-700">{items[4].value}</span>
        </div>
      )}
    </div>
  </div>
);
