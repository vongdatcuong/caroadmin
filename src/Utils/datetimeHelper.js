//TIME mm:ss
export const formatTime = (time) => {
  const min = Math.floor(time / 60);
  const second = time % 60;
  if (min > 60) {
    const hour = Math.floor(min / 60);
    return (
      ("0" + hour).slice(-2) +
      ":" +
      ("0" + min).slice(-2) +
      ":" +
      ("0" + second).slice(-2)
    );
  }
  return ("0" + min).slice(-2) + ":" + ("0" + second).slice(-2);
};

export const formatDate = (date) => {
  const result = new Date(date);

  return result.toLocaleDateString();
};
