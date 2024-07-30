import { onCall } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import { twilioClient as client } from './twilio-config';
import {
  PhoneNumberType,
  PurchaseNumberQueryFilters,
  PurchaseNumberQueryResult,
} from '@baby-bot/types';
import { log } from 'firebase-functions/logger';

interface ProviderNumber {
  phoneNumber: string;
}
function mapTwilioToBabyBotNumber<T extends ProviderNumber>(
  providerNumbers: T[],
  type: PhoneNumberType
): PurchaseNumberQueryResult[] {
  return providerNumbers.map((x) => ({
    number: x.phoneNumber,
    type,
  }));
}

export const listNumbers = onCall<PurchaseNumberQueryFilters>(
  { cors: true },
  async (context): Promise<PurchaseNumberQueryResult[] | { error: string }> => {
    const { countryCode, numberType, areaCode } = context.data;
    log(context.data);
    if (!countryCode || !numberType) {
      return {
        error: 'countryCode and numberType are required query parameters',
      };
    }

    // const validCountryCodes = ['US', 'CA'];
    // if (!validCountryCodes.includes(countryCode.toString().toUpperCase())) {
    //   return { error: `Unsupported countryCode.` };
    // }

    // Verify numberType is one of the valid values
    const validNumberTypes = ['local', 'tollfree', 'mobile'];
    if (!validNumberTypes.includes(numberType.toString())) {
      return {
        error:
          'Invalid numberType. It should be one of local, tollfree, or mobile.',
      };
    }

    if (areaCode) {
      // Check if the country code is US or CA if an area code is provided
      // if (
      //   countryCode.toString().toUpperCase() !== 'US' &&
      //   countryCode.toString().toUpperCase() !== 'CA'
      // ) {
      //   return {
      //     error:
      //       'areaCode can only be provided if the countryCode is US or CA.',
      //   };
      // }

      // Check if the area code is a valid 3-digit number
      if (!/^\d{3}$/.test(areaCode.toString())) {
        return { error: 'Invalid areaCode. It should be a 3-digit number.' };
      }
    }

    try {
      const searchParams: { areaCode: undefined | number; pageSize: number } = {
        areaCode: undefined,
        pageSize: 10,
      };

      if (areaCode) {
        searchParams.areaCode = Number(areaCode);
      }

      var queryResult: PurchaseNumberQueryResult[];
      switch (numberType) {
        case 'local': {
          const localNumbers = await client
            .availablePhoneNumbers(countryCode.toString().toUpperCase())
            .local.list(searchParams);
          queryResult = mapTwilioToBabyBotNumber(localNumbers, 'local');
          break;
        }
        case 'tollfree': {
          const tollFreeNumbers = await client
            .availablePhoneNumbers(countryCode.toString().toUpperCase())
            .tollFree.list(searchParams);
          queryResult = mapTwilioToBabyBotNumber(tollFreeNumbers, 'tollfree');
          break;
        }
        case 'mobile': {
          const mobileNumbers = await client
            .availablePhoneNumbers(countryCode.toString().toUpperCase())
            .mobile.list(searchParams);
          queryResult = mapTwilioToBabyBotNumber(mobileNumbers, 'mobile');
          break;
        }

        default:
          break;
      }

      // const phoneNumbers = availableNumbers.map((number) => number.phoneNumber);
      return queryResult;
    } catch (error) {
      console.error('Error fetching available phone numbers:', error);
      return { error: 'Internal Server Error' + error };
    }
  }
);
