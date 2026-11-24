"use client";

import { useEffect, useState } from "react";

/*
  Ano do copyright. O site e estatico: o HTML sai com o ano da build e, no
  navegador, troca pelo ano do relogio do visitante. Assim nao fica preso no
  ano do ultimo deploy (e sem aviso de hidratacao, porque troca no useEffect).
*/
export default function AnoAtual({ anoDaBuild }: { anoDaBuild: number }) {
  const [ano, setAno] = useState(anoDaBuild);

  useEffect(() => {
    setAno(new Date().getFullYear());
  }, []);

  return <>{ano}</>;
}
