export type User = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  groups?: string[];
};

export type AppLink = {
  id: string;
  name: string;
  href: string;
  description?: string;
  icon?: string; // emoji ou nome do ícone
  target?: "_blank" | "_self";
  tags?: string[];
  isDefault?: boolean;
};



