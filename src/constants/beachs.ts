interface Beach {
  id: string;
  name: string;
  nameGuru: string;
}

export const BEACHS: Beach[] = [
  {
    id: "cotovelo",
    name: "Cotovelo Beach",
    nameGuru: "brasil/rio-grande-do-norte/parnamirim/praia-do-cotovelo",
  },
  {
    id: "ponta-negra",
    name: "Ponta Negra Beach",
    nameGuru: "brasil/rio-grande-do-norte/natal/ponta-negra",
  },
  {
    id: "areia-preta",
    name: "Areia Preta Beach",
    nameGuru: "brasil/rio-grande-do-norte/natal/praia-de-areia-preta",
  },
];

export const getBeachById = (id: string) => {
  return BEACHS.find((beach) => beach.id === id);
};
