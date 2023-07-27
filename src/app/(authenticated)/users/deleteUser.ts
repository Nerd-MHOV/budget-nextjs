import {useApi} from "@/hooks/api/api";

export async function deleteUser(id: string) {
  // TODO: pergunta de verificação, e tratar erros e att pagina
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi();
  await api.deleteUser(id);
  console.log(id);
}
