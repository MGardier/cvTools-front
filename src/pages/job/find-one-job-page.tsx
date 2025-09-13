import { FindOneJob } from "@/features/job/components/find-one-job";
import { useParams } from "react-router-dom";

export const FindOneJobPage = () => {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 lg:p-8">
      <FindOneJob id={Number(params.jobId)} />
    </div>
  );
};
