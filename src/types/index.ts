export type Flavour = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  label?: string;
  featured?: boolean;
};

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "x" | "linkedin";
};
