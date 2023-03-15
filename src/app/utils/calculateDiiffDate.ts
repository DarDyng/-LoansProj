export const calculateDiffDate = (targetDate: Date) => {
    const currentDate = new Date();
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return daysDiff;
};