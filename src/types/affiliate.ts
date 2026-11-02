export interface AffiliateOffer {
  id: string;
  provider: string;
  title: string;
  description: string;
  badge: string;
  buttonText: string;
  affiliateUrl: string;
  isPlaceholder?: boolean;
}

export type AffiliateCategory = 'hosting' | 'domains' | 'courses' | 'tools' | 'cloud';

export interface AffiliateOfferExtended extends AffiliateOffer {
  category?: AffiliateCategory;
  featured?: boolean;
}
