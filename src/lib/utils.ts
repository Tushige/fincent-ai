import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// given a string, returns an array of email addresses
export const extractEmailsFromString = (text: string) => {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
};

export const isWeekend = (date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};

/**
 *
 * @param date Date object
 * @param time string reprenenting time i.e. 3:30
 * @returns a new Date object after combining the time into date
 */
export const combineDateAndTime = (date, time) => {
  const [hours, minutes] = time.split(':').map(Number);
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes);
  return combinedDate;
};
