import { generateRandomName, generateRandomEmail } from '../utils/randomData';

export interface AccountDetails {
  title?: 'Mr' | 'Mrs';
  name: string;
  email: string;
  password: string;
  day?: string;
  month?: string;
  year?: string;
  subscribeNewsletter?: boolean;
  receiveOffers?: boolean;
}

export interface AddressDetails {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}


export const accountDetails: AccountDetails = {
    title: 'Mr',
    name: generateRandomName(),
    email: generateRandomEmail(),
    password: 'Test@123',
    day: '10',
    month: '5',
    year: '1990'
};

export const addressDetails : AddressDetails = {
    firstName: accountDetails.name,
    lastName: 'Doe',
    company: 'Example Inc.',
    address1: '123 Main St',
    address2: 'Apt 4B', 
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    zipcode: '600001',
    mobileNumber: '1234567890'
};