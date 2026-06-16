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
  const Icon = (jobboard ? JOBBOARD_ICON_MAP[jobboard] : undefined) ?? CvToolsIcon;
  const iconSize = className ? "100%" : size;
  // When sized via a className box: fill the width and let the height follow the
  // viewBox aspect ratio. `height: 100%` does NOT resolve inside a CSS grid item
  // (indefinite track height → SVG collapses to 0), whereas a width percentage
  // resolves reliably against the definite column width. Jobboard logos are all
  // wider than tall, so width-fill keeps them within the (square) box.
  const iconStyle = className
    ? { width: "100%", height: "auto" }
    : undefined;

  return (
    <div
      className={cn("shrink-0 flex items-center justify-center", className && "overflow-hidden", className)}
      style={className ? undefined : { width: size, height: size }}
    >
      <Icon size={iconSize} style={iconStyle} />
    </div>
  );
};
