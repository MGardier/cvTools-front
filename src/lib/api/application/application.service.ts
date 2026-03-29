import type { IApiResponse } from "@/shared/types/api";
import type { IApplication } from "@/shared/types/entity";
import type {
  IGetApplicationsParams,
  IGetApplicationsResponse,
} from "@/modules/application/types";
import type { TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";
import { applicationApi } from "@/lib/api/application/application.api";
import type { ICreateApplicationParams, IUpdateApplicationParams } from "@/lib/api/application/types";

export const applicationService = {


  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(
    formData: TCreateApplicationFormOutput
  ): Promise<IApiResponse<IApplication>> {
    
    const params: ICreateApplicationParams = {
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

      //Address
      ...(formData.address?.city && {
        address: {
          city: formData.address.city,
          postalCode: formData.address.postalCode ?? "",
          ...(formData.address.street && { street: formData.address.street }),
          ...(formData.address.streetNumber && { streetNumber: formData.address.streetNumber }),
          ...(formData.address.complement && { complement: formData.address.complement }),
        },
      }),
      
      //Contacts
      ...(formData.contacts.length > 0 && {
        contactIds: formData.contacts.map((c) => c.id),
      }),

      //Skills
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

      //Sort
      ...(sortField && { sortField: sortField }),
      ...(sortDirection && { sortDirection }),

      //Filters
      ...(filters?.keyword && { keyword: filters.keyword }),
      ...(filters?.city && { city: filters.city }),
      ...(filters?.currentStatus && { currentStatus: filters.currentStatus }),
      ...(filters?.isFavorite && {
        isFavorite: filters.isFavorite,
      }),
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
    const hasAddress = !!formData.address?.city;

    const params: IUpdateApplicationParams = {
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

      // Address: send data or disconnect
      ...(hasAddress
        ? {
            address: {
              city: formData.address!.city!,
              postalCode: formData.address!.postalCode ?? "",
              ...(formData.address!.street && { street: formData.address!.street }),
              ...(formData.address!.streetNumber && { streetNumber: formData.address!.streetNumber }),
              ...(formData.address!.complement && { complement: formData.address!.complement }),
            },
          }
        : { disconnectAddress: true }),
    };

    return applicationApi.update(id, params);
  },

  async toggleFavorite(
    id: number,
    isFavorite: boolean
  ): Promise<IApiResponse<IApplication>> {
    return applicationApi.toggleFavorite(id, isFavorite);
  },
};
