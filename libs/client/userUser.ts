import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          //push -redirect
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
