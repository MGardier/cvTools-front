import type { TSectionId } from "./types";
import { DetailView } from "./views/detail-view";
import { HubView } from "./views/hub-view";

type TTestPageUiProps = {
  activeSection: TSectionId | null;
  onNavigate: (id: TSectionId) => void;
  onBack: () => void;
};

export const TestPageUi = ({
  activeSection,
  onNavigate,
  onBack,
}: TTestPageUiProps) => {
  if (activeSection) {
    return (
      <DetailView
        sectionId={activeSection}
        onBack={onBack}
        onNavigate={onNavigate}
      />
    );
  }
  return <HubView onNavigate={onNavigate} />;
};
