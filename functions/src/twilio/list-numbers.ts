import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';
import { twilioClient as client } from './twilio-config';

export const listNumbers = onRequest(async (req, res): Promise<any> => {
  const { countryCode, numberType, areaCode } = req.query;

  if (!countryCode || !numberType) {
    return res
      .status(400)
      .send('countryCode and numberType are required query parameters');
  }

  // Verify countryCode is a valid 2-letter country code
  if (!/^[A-Z]{2}$/.test(countryCode.toString().toUpperCase())) {
    return res
      .status(400)
      .send('Invalid countryCode. It should be a 2-letter country code.');
  }
  const validCountryCodes = ['US', 'CA'];
  if (!validCountryCodes.includes(countryCode.toString().toUpperCase())) {
    return res.status(400).send(`Unsupported countryCode.`);
  }

  // Verify numberType is one of the valid values
  const validNumberTypes = ['local', 'tollfree', 'mobile'];
  if (!validNumberTypes.includes(numberType.toString())) {
    return res
      .status(400)
      .send(
        'Invalid numberType. It should be one of local, tollfree, or mobile.'
      );
  }

  if (areaCode) {
    // Check if the country code is US or CA if an area code is provided
    if (
      countryCode.toString().toUpperCase() !== 'US' &&
      countryCode.toString().toUpperCase() !== 'CA'
    ) {
      return res
        .status(400)
        .send('areaCode can only be provided if the countryCode is US or CA.');
    }

    // Check if the area code is a valid 3-digit number
    if (!/^\d{3}$/.test(areaCode.toString())) {
      return res
        .status(400)
        .send('Invalid areaCode. It should be a 3-digit number.');
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

    var phoneNumbers;
    switch (numberType) {
      case 'local': {
        phoneNumbers = await client
          .availablePhoneNumbers(countryCode.toString().toUpperCase())
          .local.list(searchParams);
        break;
      }
      case 'tollfree': {
        phoneNumbers = await client
          .availablePhoneNumbers(countryCode.toString().toUpperCase())
          .tollFree.list(searchParams);
        break;
      }
      case 'mobile': {
        phoneNumbers = await client
          .availablePhoneNumbers(countryCode.toString().toUpperCase())
          .mobile.list(searchParams);
        break;
      }

      default:
        break;
    }

    // const phoneNumbers = availableNumbers.map((number) => number.phoneNumber);
    res.status(200).json({ phoneNumbers });
  } catch (error) {
    console.error('Error fetching available phone numbers:', error);
    res.status(500).send('Internal Server Error');
  }
});
