export default class CookieHelper {
  static Get(name) {
    if (process.env.BROWSER) {
      const re = new RegExp(name + "=([^;]+)");
      const value = re.exec(document.cookie);
      return (value != null) ? unescape(value[1]) : null;
    }
    return null;
  }
  static Set(key, value){
    if (process.env.BROWSER) {
      document.cookie = `${key}=${value};path=/`;
    }
  }
}
