export default class CookieHelper {
  static Get(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
  static Set(key, value){
    document.cookie = `${key}=${value}`;
  }
}
