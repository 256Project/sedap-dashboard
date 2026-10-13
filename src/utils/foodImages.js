// Upgrade bundled illustrations without replacing customer uploads or deleted foods.
export function migrateFoodImages(saved, initial) {
  const legacy = new Set(['burger', 'pizza', 'salad', 'steak', 'pasta', 'cake', 'tea'].map(name => `/images/foods/${name}.svg`));
  const defaults = new Map(initial.map(food => [food.id, food.image]));
  return saved.map(food => legacy.has(food.image) && defaults.has(food.id)
    ? { ...food, image: defaults.get(food.id) }
    : food);
}
