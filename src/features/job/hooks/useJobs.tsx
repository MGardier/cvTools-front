import { useState } from "react"

export const useJobs =()=> {

  const [setData,data] = useState();

  return {data};
}