export type ComponentCategory =
  | "buttons"
  | "toggles"
  | "transitions"
  | "cards"
  | "inputs"
  | "loaders";

export interface ComponentItem {
  id: string;
  slug: string;
  title: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  featured?: boolean;
  webCode: {
    filename: string;
    code: string;
    dependencies?: Record<string, string>;
  };
  mobileCode: {
    filename: string;
    code: string;
    dependencies?: Record<string, string>;
    snackId?: string; // Expo snack ID or embed URL
  };
}

export interface CategoryMeta {
  id: ComponentCategory;
  name: string;
  description: string;
  iconName: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "buttons",
    name: "Interactive Buttons",
    description: "Magnetic, glow, shimmer, and physical feedback buttons.",
    iconName: "MousePointerClick",
  },
  {
    id: "toggles",
    name: "Theme & State Toggles",
    description: "Morphing Sun/Moon, spring switches, and micro toggles.",
    iconName: "ToggleRight",
  },
  {
    id: "transitions",
    name: "Page & Sheet Transitions",
    description: "Bottom sheets, shared element morphs, and smooth reveals.",
    iconName: "Layers",
  },
  {
    id: "cards",
    name: "Tilt & 3D Cards",
    description: "Perspective tilt, holographic sheen, and expandable cards.",
    iconName: "CreditCard",
  },
  {
    id: "inputs",
    name: "Dynamic Inputs",
    description: "Floating labels, shake validation, and dynamic search bars.",
    iconName: "TextCursorInput",
  },
  {
    id: "loaders",
    name: "Loaders & Spinners",
    description: "Particle spinners, liquid flow, and pulsating dots.",
    iconName: "Loader2",
  },
];
