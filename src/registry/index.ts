import { ComponentItem, CATEGORIES, ComponentCategory } from "./schema";
import { magneticButton } from "./items/buttons/magnetic-button";
import { shimmerButton } from "./items/buttons/shimmer-button";
import { themeToggle } from "./items/toggles/theme-toggle";
import { tiltCard } from "./items/cards/tilt-card";
import { bottomSheet } from "./items/transitions/bottom-sheet";

export * from "./schema";

export const allComponents: ComponentItem[] = [
  magneticButton,
  shimmerButton,
  themeToggle,
  tiltCard,
  bottomSheet,
];

export function getAllComponents(): ComponentItem[] {
  return allComponents;
}

export function getFeaturedComponents(): ComponentItem[] {
  return allComponents.filter((c) => c.featured);
}

export function getComponentBySlug(slug: string): ComponentItem | undefined {
  return allComponents.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: ComponentCategory): ComponentItem[] {
  return allComponents.filter((c) => c.category === category);
}

export function getAllCategories() {
  return CATEGORIES;
}
