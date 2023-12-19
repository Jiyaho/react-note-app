function getDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const min = now.getMinutes();

  let time;
  if (hour >= 12) {
    time = `${hour - 12}:${min} PM`;
  } else {
    time = `${hour}:${min} AM`;
  }

  const date = `${year}-${month}-${day}, ${time}`;

  return date;
}

export default getDate;
