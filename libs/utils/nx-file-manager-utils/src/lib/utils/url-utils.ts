export class UrlUtils {
  static isHttpUrl(text: string): boolean {
    let url;

    try {
      url = new URL(text);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
