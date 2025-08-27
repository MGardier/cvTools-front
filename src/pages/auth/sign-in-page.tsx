import { AuthLayout } from "@/features/auth/components/auth-layout";
import { SignInForm } from "@/features/auth/components/form/sign-in-form";
import { useSearchParams } from "react-router-dom";


export function SignInPage() {
    const [searchParams] = useSearchParams();
   const oauthErrorCode = searchParams.get('errorCode');
 
  return (
    <AuthLayout>
      <SignInForm oauthErrorCode={oauthErrorCode}/>
    </AuthLayout>
  );
}
