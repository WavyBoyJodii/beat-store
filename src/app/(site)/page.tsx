import getBeats from '@/actions/getBeats';
import Header from '@/components/Header';

export const revalidate = 0;

export default async function Home() {
  const beats = await getBeats();
  return (
    <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div></div>
      </Header>
    </div>
  );
}
