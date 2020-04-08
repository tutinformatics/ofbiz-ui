export class SearchUtils {
  static appendQueryParams(params) {
    let esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }
}
