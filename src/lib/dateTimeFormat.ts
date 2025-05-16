import moment from 'moment';

// Date and time of this format: 2 Jan 2025; 21:29

export const dateTimeSemiColon = (date: string) => {
  return moment(date).format('D MMM YYYY; HH:mm');
};
