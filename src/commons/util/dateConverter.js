export function getDate(value){
      let d = new Date(value);
      let formattedDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
      let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
      let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
      let formattedTime = hours + ":" + minutes;

      formattedDate = formattedDate + " " + formattedTime;
      return formattedDate;
}
