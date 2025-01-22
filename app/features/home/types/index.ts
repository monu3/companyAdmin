// Placeholder for any shared TypeScript types/interfaces
export interface HomeData {
  id: number;
  name: string;
}


 export interface NavItem {
  to: string;
  label: string;
  icon?: React.ElementType;
}

export interface MainNavbarLayoutProps {
  items: NavItem[];
  children: React.ReactNode;
  logo?: string;
  className?: string;
}