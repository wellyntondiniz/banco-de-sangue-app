const BASE_URL = 'http://localhost:8080/doador'; 

export interface Doador {
	id?: number;
    nome?: string;
}

export async function listarDoadores(): Promise<Doador[]> {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) throw new Error('Erro ao listar doadores');
  return res.json();
}

export async function deletarDoador(id): Promise<Doador[]> {
  
    const res = await fetch(BASE_URL + "/" + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }

  });

  if (!res.ok) throw new Error('Erro ao listar doadores');
  return res.json();
}

