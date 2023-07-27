import {useApi} from "@/hooks/api/api";

export async function deleteRequirement(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi();
  await api.deleteRequirement(id);
}
