function(string) {
  return string.
    replace(/\W+/g, '-').
    replace(/(^[-\s]+)|([-\s]+$)/, '').
    toLowerCase();
}
