


// function randomItem(items: string[]): string {
//   return items[Math.floor(Math.random() * items.length)];
// }

export function generateRandomName(): string {
    const uniqueName = `TestUser${Date.now()}`;
    return uniqueName;
}

export function generateRandomEmail(): string {
  const uniqueEmailId = `testuser${Date.now()}@example.com`;
  return uniqueEmailId;
}
