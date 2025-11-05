// Star color based on points tier
export function getStarColor(pointsTier: number): string {
  const colors = [
    "#FFD76B", // 0 - default gold
    "#FF6B6B", // 1 - red
    "#4ECDC4", // 2 - teal
    "#45B7D1", // 3 - blue
    "#96CEB4", // 4 - green
    "#FFEAA7", // 5 - yellow
    "#DDA0DD", // 6 - plum
    "#98D8C8", // 7 - mint
    "#F7DC6F", // 8 - amber
    "#BB8FCE", // 9 - purple
  ];
  return colors[Math.min(pointsTier, colors.length - 1)] || colors[0];
}

export function getBrightness(points: number): number {
  return Math.min(1.0 + points / 1000, 2.5);
}

