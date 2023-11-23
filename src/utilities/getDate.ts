export const getRelativeTimeString = (inputTime: string): string => {
  const inputDate = new Date(inputTime);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - inputDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

  if (timeDifferenceInMinutes < 1) {
    return '방금 전';
  } else if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}분 전`;
  } else if (timeDifferenceInMinutes < 1440) {
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    return `${days}일 전`;
  }
};
