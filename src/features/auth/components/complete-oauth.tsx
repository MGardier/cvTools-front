import { Card } from "@/components/ui/card";
import { useCompleteOauth } from "./hooks/use-complete-oauth";
import { AuthCardHeader } from "./auth-card-header";


 interface CompletedOauthProps {
  loginMethod: string;
  oauthId: string;
 }

export const CompletedOauth = ({loginMethod,oauthId}: CompletedOauthProps)=> {

   const { t, isPending } = useCompleteOauth(oauthId,loginMethod,);

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <AuthCardHeader title={`${t("pages.completeOauth.title")} ${loginMethod}`}>
        {isPending && (
          <p className=" mt-4">
            <b>{t("pages.completeOauth.pending.waitingCompleteOauth")}</b>
          </p>
        )}
      </AuthCardHeader>
    </Card>
  );

}