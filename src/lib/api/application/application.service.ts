import type { IApiResponse } from "@/shared/types/api";
import type { IApplication } from "@/shared/types/entity";
import type {
  IGetApplicationsParams,
  IGetApplicationsResponse,
} from "@/modules/application/types";
import type { TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";
import { applicationApi } from "@/lib/api/application/application.api";
import type { IApplicationAddress, ICreateApplicationParams, IUpdateApplicationParams } from "@/lib/api/application/types";


export const applicationService = {


  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(
    formData: TCreateApplicationFormOutput
  ): Promise<IApiResponse<IApplication>> {
    const address = __mapAddress(formData.address);

    const params: ICreateApplicationParams = {
      ...__mapBaseFields(formData),
      ...(address && { address }),
      ...(formData.contacts.length > 0 && {
        contactIds: formData.contacts.map((c) => c.id),
      }),
      ...(formData.skills.length > 0 && {
        skillIds: formData.skills.map((s) => s.id),
      }),
    };

    return applicationApi.create(params);
  },


  // =============================================================================
  //                               FIND
  // =============================================================================

  async findOneById(id: number): Promise<IApiResponse<IApplication>> {
    return applicationApi.findOneById(id);
  },

  async findAllByUserId(
    params: IGetApplicationsParams
  ): Promise<IApiResponse<IGetApplicationsResponse>> {
    const { page, limit, sortField, sortDirection, filters } = params;

    return applicationApi.findAllByUserId({
      page,
      limit,
      ...(sortField && { sortField }),
      ...(sortDirection && { sortDirection }),
      ...(filters?.keyword && { keyword: filters.keyword }),
      ...(filters?.city && { city: filters.city }),
      ...(filters?.currentStatus && { currentStatus: filters.currentStatus }),
      ...(filters?.isFavorite && { isFavorite: filters.isFavorite }),
      ...(filters?.createdAt && { createdAt: filters.createdAt }),
      ...(filters?.company && { company: filters.company }),
      ...(filters?.jobboard && { jobboard: filters.jobboard }),
    });
  },


  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(
    id: number,
    formData: TCreateApplicationFormOutput,
  ): Promise<IApiResponse<IApplication>> {
    const address = __mapAddress(formData.address);

    const params: IUpdateApplicationParams = {
      ...__mapBaseFields(formData),
      ...(address ? { address } : { disconnectAddress: true }),
    };

    return applicationApi.update(id, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(id: number): Promise<void> {
    return applicationApi.delete(id);
  },

  async toggleFavorite(
    id: number,
    isFavorite: boolean
  ): Promise<IApiResponse<IApplication>> {
    return applicationApi.toggleFavorite(id, isFavorite);
  },
};

  // =============================================================================
  //                               MAPPING
  // =============================================================================

const __mapAddress = (address: TCreateApplicationFormOutput["address"]): IApplicationAddress | undefined => {
  if (!address?.city) return undefined;
  return {
    city: address.city,
    postalCode: address.postalCode ?? "",
    ...(address.street && { street: address.street }),
    ...(address.streetNumber && { streetNumber: address.streetNumber }),
    ...(address.complement && { complement: address.complement }),
  };
};

const __mapBaseFields = (formData: TCreateApplicationFormOutput) => ({
  title: formData.title,
  url: formData.url,
  jobboard: formData.jobboard,
  contractType: formData.contractType,
  currentStatus: formData.currentStatus,
  ...(formData.company && { company: formData.company }),
  ...(formData.description && { description: formData.description }),
  ...(formData.publishedAt && { publishedAt: formData.publishedAt }),
  ...(formData.salaryMin !== undefined && { salaryMin: formData.salaryMin }),
  ...(formData.salaryMax !== undefined && { salaryMax: formData.salaryMax }),
  ...(formData.experience && { experience: formData.experience }),
  ...(formData.remotePolicy && { remotePolicy: formData.remotePolicy }),
  ...(formData.compatibility && { compatibility: formData.compatibility }),
});
