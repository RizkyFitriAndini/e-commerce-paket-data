export function numberWithCommas(x) {
    if (x === undefined || x === null) {
      return '0'; // or you can return an empty string or any other default value
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  