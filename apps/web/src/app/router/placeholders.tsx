import { Screen } from '../components/Screen/Screen';
import { ScreenBody } from '../components/Screen/ScreenBody';
import { ScreenHeader } from '../components/Screen/ScreenHeader';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Screen>
      <ScreenHeader>
        <h1 className="text-xl font-bold font-heading">{title}</h1>
      </ScreenHeader>
      <ScreenBody className="p-4 flex flex-col items-center justify-center text-center opacity-50">
        <h2 className="text-2xl font-bold">{title} Feed</h2>
        <p className="mt-2 text-sm">Feature implementation pending</p>
      </ScreenBody>
    </Screen>
  );
}
