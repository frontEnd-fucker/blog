import { sleep } from "@/utils/sleep";

const reviews = [
  {
    id: "1",
    name: "Nullam Duis",
    rating: 4,
    text: "Phasellus efficitur, nisi ut varius ultricies, tortor arcu ullamcorper nisi, eu auctor enim est ut enim. Sed fringilla, nulla ut tincidunt hendrerit, risus tortor laoreet tortor, non mattis arcu elit vel ante.",
  },
  {
    id: "2",
    name: "Donec Nulla Velit",
    rating: 1,
    text: "Nullam fermentum nisl non mattis fringilla!!!!",
  },
  {
    id: "3",
    name: "J Tempus",
    rating: 3,
    text: "Pellentesque faucibus quam eu vehicula pulvinar. Integer cursus fringilla metus.",
  },
];

export async function GET() {
  await sleep(3000);
  return Response.json(reviews);
}
