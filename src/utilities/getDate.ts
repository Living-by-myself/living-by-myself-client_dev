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
  } else if (timeDifferenceInMinutes < 10080) {
    // 7 days * 24 hours * 60 minutes
    const days = Math.floor(timeDifferenceInMinutes / 1440);
    return `${days}일 전`;
  } else if (timeDifferenceInMinutes < 43200) {
    // 30 days * 24 hours * 60 minutes
    const weeks = Math.floor(timeDifferenceInMinutes / 10080);
    return `${weeks}주 전`;
  } else {
    const months = Math.floor(timeDifferenceInMinutes / 43200);
    return `${months}달 전`;
  }
};
