import type { ComponentType } from "react";

import { Linkedin, HelloWork, Indeed, WTTJ, FranceTravail,CvToolsIcon } from "@/shared/assets/icon/jobboard";

import { cn } from "@/shared/utils/utils";
import type { IconProps } from "@/shared/assets/icon/types";
import type { IJobboard } from "@/modules/application/types";

const JOBBOARD_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  LinkedIn: Linkedin,
  Indeed: Indeed,
  "Welcome to the Jungle": WTTJ,
  "France Travail": FranceTravail,
  HelloWork: HelloWork,
};

interface IJobboardIconProps {
  jobboard: IJobboard | null | undefined;
  size?: number | string;
  className?: string;
}

export const JobboardIcon = ({ jobboard, size = 100, className }: IJobboardIconProps) => {
  const Icon = jobboard ? JOBBOARD_ICON_MAP[jobboard.label] : undefined;
  const iconSize = className ? "100%" : size;

  return (
    <div
      className={cn("shrink-0 flex items-center justify-center", className && "overflow-hidden", className)}
      style={className ? undefined : { width: size, height: size }}
    >
      {Icon ? <Icon size={iconSize} /> : <CvToolsIcon size={iconSize} />}
    </div>
  );
};
