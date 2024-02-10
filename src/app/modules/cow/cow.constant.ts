import { IBreed, ICategory, ILabel, ILocation } from './cow.interface';

export const location: ILocation[] = [
  'Dhaka',
  'Mymensingh',
  'Rangpur',
  'Khulna',
  'Sylhet',
  'Rajshahi',
  'Barishal',
  'Chattogram',
];

export const breeds: IBreed[] = [
  'Kankrej',
  'Tharparkar',
  'Indigenous',
  'Gir',
  'Sahiwal',
  'Nellore',
  'Brahman',
];

export const label:ILabel[] = ['for sale', 'sold'];

export const categories:ICategory[] = ['Dairy', 'Beef', 'Dual Purpose'];
