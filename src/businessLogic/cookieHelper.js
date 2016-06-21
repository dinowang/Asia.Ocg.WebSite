export default class CookieHelper {
  static Get(name) {
    const re = new RegExp(name + "=([^;]+)");
    const value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
  static Set(key, value){
    document.cookie = `${key}=${value};path=/`;
  }
}
