import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const logOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error();

      toast.success("Logged out successfully", {
        duration: 2000,
      });

      router.push("/log-in");
      router.refresh();
    } catch (err) {
      toast.error("Couldn't log out, please try again.", {
        duration: 2000,
      });
    }
  };

  return { logOut }
};

export default useAuth;
