// Upgrade bundled assets without replacing uploads, edited records or deleted foods.
export function migrateFoodImages(saved, initial) {
  const defaults = new Map(initial.map(food => [food.id, food.image]));
  const legacyIllustrations = new Set(['burger', 'pizza', 'salad', 'steak', 'pasta', 'cake', 'tea'].map(name => '/images/foods/' + name + '.svg'));
  return saved.map(food => {
    const target = defaults.get(food.id);
    const previousPhoto = target?.replace(/-photo\.jpg$/, '-photo.png');
    return target && (legacyIllustrations.has(food.image) || food.image === previousPhoto)
      ? { ...food, image: target }
      : food;
  });
}
