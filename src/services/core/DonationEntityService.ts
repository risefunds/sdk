import { injectable } from 'inversify';
import { DonationEntityModel, IDonationEntityModel } from '../../models';
import { IStripeCheckoutSessionDetails } from '../../types';
import { EntityService, IEntityExtensionService } from './EntityService';

@injectable()
export class DonationEntityService
  extends EntityService<DonationEntityModel, IDonationEntityModel>
  implements IEntityExtensionService<DonationEntityModel, IDonationEntityModel>
{
  static serviceName = 'DonationEntityService';
  get serviceName(): string {
    return DonationEntityService.serviceName;
  }
  constructor() {
    super();
    this.init(
      DonationEntityModel.collection,
      DonationEntityModel.parentCollection,
      {
        from: async (json, { noHooks = false }) => {
          const donation = DonationEntityModel.fromJSON(json);
          if (!noHooks) {
            if (donation.stripeCheckoutSession?.id) {
              const stripeCheckoutSessionDetails =
                await this.baseService.backendService.request<IStripeCheckoutSessionDetails>(
                  '/prv/addon/entity/Donation/getStripeCheckoutSessionDetails',
                  {
                    donationId: donation.id,
                  }
                );

              donation.stripeCheckoutSessionDetails =
                stripeCheckoutSessionDetails;
            }
          }

          return donation;
        },
      }
    );
  }
}
