export function convertToPlain(HtmlString: string | undefined) {
  if (HtmlString !== undefined) return HtmlString.replace(/<[^>]+>/g, '');
  else return '';
}
