import getBeats from '@/actions/getBeats';
import getLatestFiveBeats from '@/actions/getLatestFiveBeats';
import getLatestRemainingBeats from '@/actions/getLatestRemainingBeats';
import Header from '@/components/Header';
import MainDisplay from './components/MainDisplay';
import PageContent from './components/PageContent';

export const revalidate = 0;

export default async function Home() {
  const beats = await getLatestFiveBeats();
  const remainingBeats = await getLatestRemainingBeats();
  return (
    <div className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div></div>
      </Header>
      <div className=" mt-2 mb-7 px-6">
        <div className="flex items-center justify-center">
          <h1 className="text-white text-2xl font-semibold">Beat Store</h1>
        </div>
        <MainDisplay beats={beats} />
        <div className="flex items-center justify-center">
          <h1 className="text-white text-2xl font-semibold">Catalog</h1>
        </div>
        <PageContent beats={remainingBeats} />
      </div>
    </div>
  );
}
