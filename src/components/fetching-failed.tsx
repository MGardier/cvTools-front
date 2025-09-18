import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface FetchingFailedProps {
  title: string;
  message: string;
}

export const FetchingFailed = ({ title, message }: FetchingFailedProps) => {
  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl py-2 ">
          <h1 className="text-3xl font-display font-semibold  leading-8 tracking-tighter">
            {title}
          </h1>
        </CardTitle>
        <CardDescription className="font-normal  font-sans text-sm ">
          <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
            <p>
              <b>{message}</b>
            </p>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
