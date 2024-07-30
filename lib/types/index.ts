export type PurchaseNumberQueryFilters = {
  countryCode?: string;
  numberType?: string;
  areaCode?: string;
};

export type PhoneNumberType = 'mobile' | 'local' | 'tollfree';

export type PurchaseNumberQueryResult = {
  number: string;
  type: PhoneNumberType;
};
