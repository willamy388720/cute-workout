import { ReactNode, useEffect, useState } from "react";
import { auth, database } from "@services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { get, ref } from "firebase/database";
import { Flex, Spinner } from "@radix-ui/themes";
import { useProfile } from "@hooks/useProfile";

type UserRouteProps = {
  children: ReactNode;
};

export function UserRoute({ children }: UserRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const { mutationProfileFn } = useProfile();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;

          const snapshot = await get(ref(database, "profiles/" + uid));

          if (snapshot.exists()) {
            setIsAuthenticated(true);

            await mutationProfileFn({
              id: uid,
              email: snapshot.val().email,
              name: snapshot.val().name,
              image: snapshot.val().image,
              weight: snapshot.val().weight,
              height: snapshot.val().height,
              bodybuildingStudents: snapshot.val().bodybuildingStudents,
              isBodybuildingStudent: snapshot.val().isBodybuildingStudent,
              isCoaching: snapshot.val().isCoaching,
              coachId: snapshot.val().coachId,
              action: "save",
            });
          }
        } catch (error) {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Flex
        style={{ height: "100vh" }}
        width={"100%"}
        justify={"center"}
        align={"center"}
      >
        <Spinner size={"3"} />
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}
