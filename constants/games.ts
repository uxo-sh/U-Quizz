export type Game = {
  id: string;
  name: string;
  tagline: string;
  color: string;
};

export const games: Game[] = [
  { id: 'dark-souls-1', name: 'Dark Souls I', tagline: 'Prepare to Die', color: '#4A7C7C' },
  { id: 'dark-souls-2', name: 'Dark Souls II', tagline: 'Seek the King', color: '#7A4F10' },
  { id: 'dark-souls-3', name: 'Dark Souls III', tagline: 'Embrace the Darkness', color: '#C8860A' },
  { id: 'bloodborne', name: 'Bloodborne', tagline: 'Fear the Old Blood', color: '#6B1A1A' },
  { id: 'sekiro', name: 'Sekiro', tagline: 'Shadows Die Twice', color: '#8B1A1A' },
  { id: 'elden-ring', name: 'Elden Ring', tagline: 'Rise, Tarnished', color: '#C8860A' },
  { id: 'demons-souls', name: 'Demon\'s Souls', tagline: 'So It Begins', color: '#4A7C7C' },
  { id: 'all', name: 'All Games', tagline: 'The Ultimate Challenge', color: '#E8DCC8' },
];
