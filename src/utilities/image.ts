export function extractImageUrls(dataString: string): string[] {
  if (!dataString) {
    return [];
  }

  const imageUrls: string[] = dataString.split(',').map((url) => url.trim());
  return imageUrls;
}

export function addResizeToUrl(originalUrl: string): string {
  if (!originalUrl) {
    return originalUrl;
  }

  const urlParts = originalUrl.split('.com/');
  if (urlParts.length === 2) {
    return `${urlParts[0]}.com/resize/${urlParts[1]}`;
  } else {
    // URL 형식이 잘못되었을 경우 그대로 반환
    return originalUrl;
  }
}
