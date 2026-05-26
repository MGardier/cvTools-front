import { ArrowRight, Clock, Quote } from "lucide-react";

import { CANDIDATE } from "../data/candidate";

const STORY_EXCERPT_LENGTH = 320;

const truncateAtWord = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
  return cut.replace(/[\s.,:;]+$/u, "");
};

type TStoryPreviewProps = {
  onClick: () => void;
};

export const StoryPreview = ({ onClick }: TStoryPreviewProps) => {
  const excerpt = truncateAtWord(CANDIDATE.story, STORY_EXCERPT_LENGTH);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group mt-4 block w-full border-t border-zinc-100 pt-4 text-left md:mt-5 md:pt-5"
    >
      <div className="flex items-start gap-3 transition-transform duration-300 group-hover:scale-[1.02]">
        <Quote className="mt-0.5 h-4 w-4 shrink-0 rotate-180 text-blue-300" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] italic leading-relaxed text-zinc-500 md:text-sm">
            {excerpt}
            <span className="whitespace-nowrap">
              {" ..."}
              <Quote className="ml-2 inline h-4 w-4 align-middle text-blue-300" />
            </span>
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 transition-colors duration-300 group-hover:text-blue-400">
              <Clock className="h-3 w-3" />
              ~2 min
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors duration-300 group-hover:text-blue-400">
              Lire mon histoire complète
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
};
