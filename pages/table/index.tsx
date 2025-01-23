import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TableIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push("/table/1");
  }, [router]);

  return null;
}
