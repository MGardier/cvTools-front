import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/constants/routes";
import { ME_QUERY_KEY } from "@/shared/hooks/useMe";
import { createAdminRegisterSchema } from "../schema/admin-auth-schema";
import type { IRegisterAdminResponse } from "../types";
import type { IApiErrors } from "@/shared/types/api";
import { adminService } from "@/lib/api/auth/admin/admin.service";
import { AdminRegisterUi } from "./admin-register.ui";

export const AdminRegister = () => {
    const { t } = useTranslation("auth");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const queryClient = useQueryClient();

    // No invitation token in the URL: nothing to register against → bail to sign-in.
    useEffect(() => {
        if (!token) {
            toast.error(t("messages.errors.fallback"));
            navigate(ROUTES.home);
        }
    }, []);

    const invitationQuery = useQuery({
        queryKey: ["admin-invitation", token],
        queryFn: () => adminService.validateInvitation(token!),
        enabled: !!token,
        retry: false,
    });

    const schema = createAdminRegisterSchema(t);
    const defaultValues = {
        password: "",
        confirmPassword: "",
    };

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const mutation = useMutation<IRegisterAdminResponse, IApiErrors, z.infer<typeof schema>>({
        mutationFn: (values) =>
            adminService.register({ token: token!, password: values.password }),
        onSuccess: (response) => {
            toast.success(t("messages.success.adminRegister", t("messages.success.signIn")));
            queryClient.setQueryData(ME_QUERY_KEY, response);
            navigate(ROUTES.home);
        },
        onError: (error) => {
            toast.error(t(`messages.errors.api.${error.message}`, t("messages.errors.fallback")));
        },
    });

    const onSubmit = (values: z.infer<typeof schema>) => {
        mutation.mutate(values);
    };

    return (
        <AdminRegisterUi
            form={form}
            onSubmit={onSubmit}
            isPending={mutation.isPending}
            isValidating={!!token && invitationQuery.isPending}
            isInvalidInvitation={invitationQuery.isError}
            email={invitationQuery.data?.data.email ?? ""}
            token={token ?? ""}
            t={t}
        />
    );
};
