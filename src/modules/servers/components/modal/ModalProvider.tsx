"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "~/modules/servers/components/modal/CreateServerModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
    </>
  );
}
