export const APP_STORE_URL = "https://apps.apple.com/vn/app/tactlink/id1469516661";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.tactlink.app&pli=1";

export function getMobileAppStoreUrl(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/.test(ua) || (ua.includes("Macintosh") && navigator.maxTouchPoints > 1)) {
    return APP_STORE_URL;
  }
  if (/Android/.test(ua)) {
    return PLAY_STORE_URL;
  }
  return null;
}
