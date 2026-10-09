import { ComponentItem, CATEGORIES, ComponentCategory } from "./schema";
import { magneticButton } from "./items/buttons/magnetic-button";
import { themeToggle } from "./items/toggles/theme-toggle";

export * from "./schema";

export const allComponents: ComponentItem[] = [
  magneticButton,
  themeToggle,
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
