const stack: string[] = [];

export function pushOverlay(id: string) {
  stack.push(id);
  let removed = false;
  return () => {
    if (removed) return;
    removed = true;
    const index = stack.lastIndexOf(id);
    if (index >= 0) stack.splice(index, 1);
  };
}

export function isTopOverlay(id: string) {
  return stack[stack.length - 1] === id;
}
