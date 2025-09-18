import { Layout } from "@/components/layout";

import { UpdateJob } from "@/features/job/components/update-job";

import {  useParams } from "react-router-dom";

export const UpdateJobPage = ()=> {
   const params = useParams();
    return (
      <Layout>
          <UpdateJob jobId={Number(params.jobId)} />
      </Layout>
    );
}