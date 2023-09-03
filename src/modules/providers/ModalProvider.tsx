"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "~/modules/modals/components";

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
