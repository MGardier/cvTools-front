import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "@/app/constants/routes";

import { isValidSectionId } from "./lib/sections";
import { TestPageUi } from "./test-page.ui";
import type { TSectionId } from "./types";

export const TestPage = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();

  const activeSection: TSectionId | null = isValidSectionId(sectionId)
    ? sectionId
    : null;

  const handleNavigate = (id: TSectionId) => {
    navigate(ROUTES.test.section(id));
  };

  const handleBack = () => {
    navigate(ROUTES.test.root);
  };

  return (
    <TestPageUi
      activeSection={activeSection}
      onNavigate={handleNavigate}
      onBack={handleBack}
    />
  );
};
