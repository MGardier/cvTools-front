import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"




export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}





export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
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
      indexSplit = text.lastIndexOf(" ", targetPosition);
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



