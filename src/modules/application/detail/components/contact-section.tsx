import type { IContact } from "@/shared/types/entity";
import type { TTranslationFn } from "../types";

interface IContactSectionProps {
  contacts: IContact[];
  t: TTranslationFn;
}

export const ContactSection = ({ contacts, t }: IContactSectionProps) => {
  return (
    <div className="border-t border-slate-200 py-6 mb-8">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        {t("detail.contacts")}
      </h3>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-sky-700">
                {contact.firstname[0]}{contact.lastname[0]}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700">
                {contact.firstname} {contact.lastname}
                <span className="font-normal text-slate-400 ml-1.5">· {contact.profession}</span>
              </p>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500 flex-wrap">
                <a href={`mailto:${contact.email}`} className="hover:text-sky-600 transition-colors">
                  {contact.email}
                </a>
                {contact.phone && (
                  <>
                    <span className="text-slate-300">·</span>
                    <a href={`tel:${contact.phone}`} className="hover:text-sky-600 transition-colors">
                      {contact.phone}
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
