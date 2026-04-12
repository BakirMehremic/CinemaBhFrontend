export type VenuePreviewResponse = {
  id: number;
  name: string;
  street: string;
  street_number: string;
  city_name: string;
  image_url: string;
};

export type VenueDetailsResponse = {
  id: number;
  name: string;
  image_url: string;
  city_name: string;
  street_number: string;
  street: string;
  phone: string;
};

export type VenueBasicInfoResponse = {
  id: number;
  name: string;
  image_url: string;
};
