
import type { IEnumWithTranslationItem } from "@/types/form"
import { clsx, type ClassValue } from "clsx"
import type { TFunction } from "i18next"
import { twMerge } from "tailwind-merge"




export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}


export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export const splitTextAtSpaces = (text: string, limit: number): string[] => {
  const texts: string[] = [];

  const countSplit = Math.ceil(text.length / limit);
  if (countSplit <= 1) {
    return [text];
  }

  let prevIndexSplit = 0;
  let targetPosition = limit;

  for (let i = 0; i < countSplit - 1; i++) {
    let indexSplit = text.indexOf(" ", targetPosition);

    if (indexSplit === -1) {
      indexSplit = text.lastIndexOf(" ");
    }

    if (indexSplit === -1 || indexSplit <= prevIndexSplit) {
      indexSplit = targetPosition;
    }

    texts.push(text.slice(prevIndexSplit, indexSplit).trim());
    prevIndexSplit = indexSplit + 1;
    targetPosition = prevIndexSplit + limit;
  }

  if (prevIndexSplit < text.length) {
    texts.push(text.slice(prevIndexSplit).trim());
  }

  return texts;
};

export const getJobStatusWithTranslation = (t: TFunction<'job', undefined>): IEnumWithTranslationItem[] => {
  return [
    {
      value: "NEED_TO_CONTACT",
      label: t('form.status.values.need_to_contact')
    },
    {
      value: "NEED_TO_VALIDATE_MESSAGE",
      label: t('form.status.values.need_to_validate_message')
    },
    {
      value: "NEED_TO_SEND_MESSAGE",
      label: t('form.status.values.need_to_send_message')
    },
    {
      value: "INTERVIEWS",
      label: t('form.status.values.interviews')
    },
    {
      value: "TECHNICAL_TEST",
      label: t('form.status.values.technical_test')
    },
    {
      value: "NEED_TO_SEND_THANKS_AFTER_INTERVIEW",
      label: t('form.status.values.need_to_send_thanks_after_interview')
    },
    {
      value: "NEED_TO_SEND_MAIL_REMINDER",
      label: t('form.status.values.need_to_send_mail_reminder')
    },
  ]

}

export const getJobSApplicationMethodWithTranslation = (t: TFunction<'job', undefined>): IEnumWithTranslationItem[] => {
  return [
    {
      value: "LINKEDIN",
      label: t('form.applicationMethod.values.linkedin')
    },
    {
      value: "JOBBOARD",
      label: t('form.applicationMethod.values.jobboard')
    },
    {
      value: "EMAIL",
      label: t('form.applicationMethod.values.email')
    },
    {
      value: "OTHER",
      label: t('form.applicationMethod.values.other')
    },
  ]
}

export const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  }

}


