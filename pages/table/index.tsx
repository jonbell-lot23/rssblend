import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TableIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push("/table/all");
  }, [router]);

  return null;
}
