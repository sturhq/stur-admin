export const OnboardingSteps = [1, 2, 3];

export const States = [
  {value: 'abia', label: 'Abia'},
  {value: 'adamawa', label: 'Adamawa'},
  {value: 'akwa-ibom', label: 'Akwa Ibom'},
  {value: 'anambra', label: 'Anambra'},
  {value: 'bauchi', label: 'Bauchi'},
  {value: 'bayelsa', label: 'Bayelsa'},
  {value: 'benue', label: 'Benue'},
  {value: 'borno', label: 'Borno'},
  {value: 'cross-river', label: 'Cross River'},
  {value: 'delta', label: 'Delta'},
  {value: 'ebonyi', label: 'Ebonyi'},
  {value: 'edo', label: 'Edo'},
  {value: 'ekiti', label: 'Ekiti'},
  {value: 'enugu', label: 'Enugu'},
  {value: 'gombe', label: 'Gombe'},
  {value: 'imo', label: 'Imo'},
  {value: 'jigawa', label: 'Jigawa'},
  {value: 'kaduna', label: 'Kaduna'},
  {value: 'kano', label: 'Kano'},
  {value: 'katsina', label: 'Katsina'},
  {value: 'kebbi', label: 'Kebbi'},
  {value: 'kogi', label: 'Kogi'},
  {value: 'kwara', label: 'Kwara'},
  {value: 'lagos', label: 'Lagos'},
  {value: 'nasarawa', label: 'Nasarawa'},
  {value: 'niger', label: 'Niger'},
  {value: 'ogun', label: 'Ogun'},
  {value: 'ondo', label: 'Ondo'},
  {value: 'osun', label: 'Osun'},
  {value: 'oyo', label: 'Oyo'},
  {value: 'plateau', label: 'Plateau'},
  {value: 'rivers', label: 'Rivers'},
  {value: 'sokoto', label: 'Sokoto'},
  {value: 'taraba', label: 'Taraba'},
  {value: 'yobe', label: 'Yobe'},
  {value: 'zamfara', label: 'Zamfara'},
  {value: 'fct', label: 'Federal Capital Territory (Abuja)'},
];

export const LGAsByState: Record<string, string[]> = {
  lagos: [
    'Agege',
    'Ajeromi-Ifelodun',
    'Alimosho',
    'Amuwo-Odofin',
    'Apapa',
    'Badagry',
    'Epe',
    'Eti-Osa',
    'Ibeju-Lekki',
    'Ifako-Ijaiye',
    'Ikeja',
    'Ikorodu',
    'Kosofe',
    'Lagos Island',
    'Lagos Mainland',
    'Mushin',
    'Ojo',
    'Oshodi-Isolo',
    'Shomolu',
    'Surulere',
  ],
  abuja: [
    'Abaji',
    'Bwari',
    'Gwagwalada',
    'Kuje',
    'Kwali',
    'Municipal Area Council',
  ],
  kano: [
    'Dala',
    'Fagge',
    'Gwale',
    'Kumbotso',
    'Nassarawa',
    'Tarauni',
    'Ungogo',
  ],
  // Add more states and LGAs...
};
