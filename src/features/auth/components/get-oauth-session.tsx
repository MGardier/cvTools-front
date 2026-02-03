import { Card } from "@/common/components/ui/card";

import { AuthCardHeader } from "./auth-card-header";
import { useGetOauthSession } from "./hooks/use-get-oauth-session";



 interface getOauthSessionProps {
  sessionId: string;
  loginMethod: string;
 }

export const GetOauthSession = ({loginMethod,sessionId}: getOauthSessionProps)=> {

  const { t, isPending } = useGetOauthSession(sessionId,loginMethod);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={`${t("pages.getOauthSession.title")} ${loginMethod}`}>
        {isPending && (
          <p className=" mt-4">
            <b>{t("pages.getOauthSession.pending.waiting")}</b>
          </p>
        )}
      </AuthCardHeader>
    </Card>
  );

}