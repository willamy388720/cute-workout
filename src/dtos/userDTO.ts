export type UserDTO = {
  id: string;
  email: string;
  name: string;
  image: string;
  weight: string;
  height: string;
  isBodybuildingStudent?: boolean;
  isCoaching?: boolean;
  bodybuildingStudents?: string[];
  coachId?: string;
};
