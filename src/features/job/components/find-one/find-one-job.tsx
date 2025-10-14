import { useFindOneJob } from "../../hooks/use-find-one-job";
import { FindOneJobChronology } from "./find-one-job-chronology";
import { FindOneJobHeader } from "./find-one-job-header";
import { FindOneJobInfos } from "./find-one-job-infos";

interface DialogFindOneJobProps {
  id: number;
}

export const FindOneJob = ({ id }: DialogFindOneJobProps) => {
  const { job,  isPending } = useFindOneJob(id);
  if (isPending) return <></>;
  if (!job) return <></>;

  return (
    <div>
      <FindOneJobHeader {...{ job }} />
      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-4 md:col-span-6 rounded-md">
              <FindOneJobInfos {...{ job }} />
              <FindOneJobChronology {...{ job }} />
            </div>

            <div className="lg:col-span-8 md:col-span-6">
              <h5 className="text-lg font-semibold">Description:</h5>

              <p className="text-slate-400 mt-4">
              {job.description ? job.description : "Non renseigné"}
              </p>

              <h5 className="text-lg font-semibold mt-6">
                Responsibilities and Duties:{" "}
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Participate in requirements analysis
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Write clean, scalable code using C# and .NET frameworks
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Test and deploy applications and systems
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Revise, update, refactor and debug code
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Improve existing software
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Develop documentation throughout the software development life
                  cycle (SDLC)
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Serve as an expert on applications and provide technical
                  support
                </li>
              </ul>

              <h5 className="text-lg font-semibold mt-6">
                Required Experience, Skills and Qualifications:{" "}
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Proven experience as a .NET Developer or Application Developer
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  good understanding of SQL and Relational Databases,
                  specifically Microsoft SQL Server.
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Experience designing, developing and creating RESTful web
                  services and APIs
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Basic know how of Agile process and practices
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Good understanding of object-oriented programming.
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Good understanding of concurrent programming.
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Sound knowledge of application architecture and design.
                </li>
                <li className="text-slate-400 mt-2">
                  <i className="uil uil-arrow-right text-emerald-600 me-1"></i>
                  Excellent problem solving and analytical skills
                </li>
              </ul>

              <div className="mt-5">
                <a
                  href="job-apply.html"
                  className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white md:ms-2 w-full md:w-auto"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
