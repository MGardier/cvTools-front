import { useState } from "react";
import { Check, Copy, type LucideIcon } from "lucide-react";

type TCopyableItemProps = {
  icon: LucideIcon;
  text: string;
};

export const CopyableItem = ({ icon: Icon, text }: TCopyableItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silent fail
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex w-fit items-center gap-1.5 text-xs text-zinc-600 transition duration-300 hover:scale-[1.10] hover:text-blue-500"
    >
      <Icon className="h-3.5 w-3.5 text-blue-400" />
      <span>{text}</span>
      {copied ? (
        <Check className="h-3 w-3 text-emerald-600" />
      ) : (
        <Copy className="h-3 w-3 text-zinc-600" />
      )}
    </button>
  );
};
