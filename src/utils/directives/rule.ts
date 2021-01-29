export default (val: string) => {
  switch (val + "") {
    case "1":
      return true;
    default:
      return false;
  }
}