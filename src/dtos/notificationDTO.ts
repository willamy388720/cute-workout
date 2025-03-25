export type NotificationDTO = {
  id: string;
  invitedBy: string;
  sentAt: Date | string;
  type: "Invitation" | "End Of Bond";
};
