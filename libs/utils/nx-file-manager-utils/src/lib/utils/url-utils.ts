export class UrlUtils {
  static isHttpUrl(text: string): boolean {
    let url;

    try {
      url = new URL(text);
    } catch (error) {
      console.error(error);
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
