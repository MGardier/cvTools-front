
import type { IApiResponse } from "@/shared/types/api";
import type {
  IGetApplicationsParams,
  IGetApplicationsResponse,
  IApplication,
  ICreateApplicationParams,
} from "@/modules/application/types";
import type { TCreateApplicationForm } from "@/modules/application/schema/application-schema";
import { applicationApi } from "@/lib/api/application/application.api";
import { APPLICATION_MOCK_DATA } from "@/modules/application/application.mock";


export const applicationService = {

  /**************** FIND ALL BY USER ID ************************************************************/

  async findAllByUserId(params: IGetApplicationsParams): Promise<IApiResponse<IGetApplicationsResponse>> {

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    let items: IApplication[] = [...APPLICATION_MOCK_DATA];

    // ── Filtering ──────────────────────────────────────────────
    const { filters } = params;

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.company?.toLowerCase().includes(search) ||
          item.jobboard?.toLowerCase().includes(search)
      );
    }

    if (filters?.isFavorite) {
      items = items.filter((item) => item.isFavorite);
    }

    if (filters?.status && filters.status.length > 0) {
      items = items.filter((item) => filters.status!.includes(item.currentStatus));
    }

    if (filters?.createdAtFrom) {
      const from = new Date(filters.createdAtFrom).getTime();
      items = items.filter((item) => new Date(item.createdAt).getTime() >= from);
    }

    if (filters?.city) {
      const city = filters.city.toLowerCase();
      items = items.filter(
        (item) => item.address?.city.toLowerCase().includes(city)
      );
    }

    // ── Sorting ────────────────────────────────────────────────
    if (params.sortField) {
      const field = params.sortField;
      const order = params.sortOrder ?? "asc";

      items = [...items].sort((a, b) => {
        let aVal: string | number | null | undefined;
        let bVal: string | number | null | undefined;

        if (field === "jobboard") {
          aVal = a.jobboard;
          bVal = b.jobboard;
        } else {
          aVal = a[field] as string | number | null | undefined;
          bVal = b[field] as string | number | null | undefined;
        }

        if (aVal === null || aVal === undefined) return order === "asc" ? 1 : -1;
        if (bVal === null || bVal === undefined) return order === "asc" ? -1 : 1;

        if (typeof aVal === "string" && typeof bVal === "string") {
          return order === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number" && typeof bVal === "number") {
          return order === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
      });
    }

    // ── Pagination ─────────────────────────────────────────────
    const total = items.length;
    const { page, limit } = params;
    const start = (page - 1) * limit;
    const paginatedItems = items.slice(start, start + limit);

    return {
      success: true,
      statusCode: 200,
      timestamp: new Date().toISOString(),
      path: "/application",
      data: {
        items: paginatedItems,
        total,
        page,
        limit,
      },
    };
  },

  /**************** CREATE ************************************************************/

  async create(formData: TCreateApplicationForm): Promise<IApiResponse<IApplication>> {
    const { address, contacts, skills, salaryMin, salaryMax, publishedAt, ...fields } = formData;

    const request: ICreateApplicationParams = {
      ...fields,
      ...(publishedAt && { publishedAt: new Date(publishedAt) }),
      ...(salaryMin && !Number.isNaN(salaryMin) && { salaryMin }),
      ...(salaryMax && !Number.isNaN(salaryMax) && { salaryMax }),
      ...(address?.city && { address: { ...address, city: address.city, postalCode: address.postalCode ?? "" } }),
      ...(contacts.length > 0 && { contacts }),
      ...(skills.length > 0 && { skills }),
    };

    return applicationApi.create(request);
  },

}
