export interface GuestsMap {
  [key: string]: {
    text: string;
  };
};

const guestsMap: GuestsMap = {
  'kuzma': {
    text: 'Рідний брате Кузьма'
  },
  'ilya': {
    text: 'Дорогий Ілля'
  },
  'vlada': {
    text: 'Люба Владиславо'
  }
};

export default guestsMap;
