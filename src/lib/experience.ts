export const FOUNDING_YEAR = 1999;

export const getYearsOfExperience = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - FOUNDING_YEAR;
};

export const getExperienceText = (): string => {
  return `${getYearsOfExperience()}+`;
};

export const getExperienceDescription = (): string => {
  const years = getYearsOfExperience();
  return `${years}+ years of excellence in computer repair, networking, and IT consulting services in Rajkot.`;
};
