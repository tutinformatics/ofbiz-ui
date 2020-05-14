export function readErrorMsg(response) {
  let errArray = [];
  for (let i = 0; i < response.errorMessageList.length; i++) {
    let msg = response.errorMessageList[i].message;
    errArray.push(msg);
  }
  return errArray.join(' and ');
}
