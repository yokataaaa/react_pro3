export async function getFoods({
  order = "",
  cursor = "",
  limit = 10,
  search = "",
}) {
  const response = await fetch(
    `https://learn.codeit.kr/api/foods?order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`
  );
  if (!response.ok) {
    throw new Error("데이터를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
