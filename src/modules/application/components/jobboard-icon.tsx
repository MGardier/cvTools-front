import type { ComponentType } from "react";

import { Linkedin, HelloWork, Indeed, WTTJ, FranceTravail, CvToolsIcon } from "@/shared/assets/icon/jobboard";

import { cn } from "@/shared/utils/utils";
import type { IconProps } from "@/shared/assets/icon/types";
import { EJobboard, type TJobboard } from "@/modules/application/types";

const JOBBOARD_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  [EJobboard.LINKEDIN]: Linkedin,
  [EJobboard.INDEED]: Indeed,
  [EJobboard.WTTJ]: WTTJ,
  [EJobboard.FRANCE_TRAVAIL]: FranceTravail,
  [EJobboard.GLASSDOOR]: CvToolsIcon,
  [EJobboard.APEC]: CvToolsIcon,
  [EJobboard.HELLO_WORK]: HelloWork,
  [EJobboard.METEO_JOB]: CvToolsIcon,
  [EJobboard.UNKNOW]: CvToolsIcon,
};

interface IJobboardIconProps {
  jobboard: TJobboard | null | undefined;
  size?: number | string;
  className?: string;
}

export const JobboardIcon = ({ jobboard, size = 100, className }: IJobboardIconProps) => {
  const Icon = jobboard ? JOBBOARD_ICON_MAP[jobboard] : undefined;
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
