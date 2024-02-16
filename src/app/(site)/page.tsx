import getBeats from '@/actions/getBeats';
import Header from '@/components/Header';
import MainDisplay from './components/MainDisplay';

export const revalidate = 0;

export default async function Home() {
  const beats = await getBeats();
  return (
    <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div></div>
      </Header>
      <div className=" mt-2 mb-7 px-6">
        <MainDisplay beats={beats} />
      </div>
    </div>
  );
}
