export default interface AppColors {
  readonly primary: { [key: string]: string };
  readonly secondary: { [key: string]: string };
  readonly red: { [key: string]: string };
  readonly green: { [key: string]: string };
  readonly blue: { [key: string]: string };
  readonly orange: { [key: string]: string };
}

export const colors: AppColors = {
  primary: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e0e0e0',
    '400': '#bdbdbd',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
    '950': 'black',
  },
  secondary: {
    '50': '#eceff1',
    '100': '#cfd8dc',
    '200': '#b0bec5',
    '300': '#90a4ae',
    '400': '#78909c',
    '500': '#607d8b',
    '600': '#546e7a',
    '700': '#455a64',
    '800': '#37474f',
    '900': '#263238',
  },
  red: {
    '50': '#ffebee',
    '100': '#ffcdd2',
    '200': '#ef9a9a',
    '300': '#e57373',
    '400': '#ef5350',
    '500': '#f44336',
    '520': '#f4433633',
    '525': '#f4433640',
    '600': '#e53935',
    '700': '#d32f2f',
    '800': '#c62828',
    '900': '#b71c1c',
  },
  green: {
    '50': '#e8f5e9',
    '100': '#c8e6c9',
    '200': '#a5d6a7',
    '300': '#81c784',
    '400': '#66bb6a',
    '500': '#4caf50',
    '520': '#4caf5033',
    '525': '#4caf5040',
    '600': '#43a047',
    '700': '#388e3c',
    '800': '#2e7d32',
    '900': '#1b5e20',
  },
  blue: {
    '50': '#E3F2FD',
    '100': '#BBDEFB',
    '200': '#90CAF9',
    '300': '#64B5F6',
    '400': '#42A5F5',
    '500': '#2196F3',
    '600': '#1E88E5',
    '700': '#1976D2',
    '800': '#1565C0',
    '900': '#0D47A1',
  },
  orange: {
    '50': '#FFF3E0',
    '100': '#FFE0B2',
    '200': '#FFCC80',
    '300': '#FFB74D',
    '400': '#FFA726',
    '500': '#FF9800',
    '600': '#FB8C00',
    '700': '#F57C00',
    '800': '#EF6C00',
    '900': '#E65100',
  },
};
