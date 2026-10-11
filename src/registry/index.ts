import { ComponentItem, CATEGORIES, ComponentCategory } from "./schema";
import { smartLockInput } from "./items/inputs/smart-lock-input";
import { bottomNavigationFluid } from "./items/transitions/bottom-navigation-fluid";

export * from "./schema";

export const allComponents: ComponentItem[] = [
  smartLockInput,
  bottomNavigationFluid,
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
