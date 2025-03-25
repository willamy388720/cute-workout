import { useState, useEffect } from "react";
import { database } from "@services/firebase";
import { ref, onValue } from "firebase/database";
import { NotificationDTO } from "@dtos/notificationDTO";
import { useProfile } from "./useProfile";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { profile } = useProfile();

  useEffect(() => {
    const notificationsRef = ref(
      database,
      "invitations_sent/" + profile.id + "/invitations/"
    );

    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataFormatted = Object.entries<NotificationDTO>(
          snapshot.val() ?? {}
        ).map(([id, value]) => ({
          id,
          invitedBy: value.invitedBy,
          sentAt: value.sentAt,
          type: value.type,
        }));

        setNotifications(dataFormatted);
      } else {
        setNotifications([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  return {
    notifications,
    isLoading,
  };
}
