import { Screen } from '../components/Screen/Screen';
import { ScreenBody } from '../components/Screen/ScreenBody';
import { ScreenHeader } from '../components/Screen/ScreenHeader';

export function DesignSystemSandbox() {
  return (
    <Screen>
      <ScreenHeader>
        <h1 className="text-h2">Design System</h1>
      </ScreenHeader>
      <ScreenBody className="p-4 lg:p-8 space-y-12 pb-32">
        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-overline uppercase tracking-widest text-primary">Typography</h2>
          <div className="space-y-2">
            <p className="text-display">Display</p>
            <p className="text-h1">Heading 1</p>
            <p className="text-h2">Heading 2</p>
            <p className="text-h3">Heading 3</p>
            <p className="text-title">Title</p>
            <p className="text-body">Body Text (Regular)</p>
            <p className="text-caption text-base-content/60">Caption text</p>
            <p className="text-label text-base-content/60">Label</p>
            <p className="text-overline">OVERLINE</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-overline uppercase tracking-widest text-primary">Buttons & Radii</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              type="button"
              className="btn btn-primary rounded-[var(--radius-full)] px-[var(--spacing-24)] h-[var(--spacing-48)] min-h-0 text-title"
            >
              Primary Button
            </button>
            <button type="button" className="btn btn-secondary rounded-[var(--radius-lg)]">
              Secondary Button
            </button>
            <button type="button" className="btn btn-outline rounded-[var(--radius-md)]">
              Outline
            </button>
          </div>
        </section>

        {/* Cards & Elevation */}
        <section className="space-y-4">
          <h2 className="text-overline uppercase tracking-widest text-primary">
            Elevation & Surfaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-16)]">
            {/* Standard Card */}
            <div className="bg-base-200 rounded-[var(--radius-2xl)] p-[var(--spacing-24)] shadow-[var(--shadow-card)]">
              <h3 className="text-h3 mb-2">Standard Card</h3>
              <p className="text-body text-base-content/80">Uses --shadow-card and --radius-2xl.</p>
            </div>

            {/* Floating Surface with Blur */}
            <div className="bg-base-100/40 backdrop-blur-[var(--blur-medium)] border border-base-content/10 rounded-[var(--radius-2xl)] p-[var(--spacing-24)] shadow-[var(--shadow-floating)]">
              <h3 className="text-h3 mb-2">Floating Surface</h3>
              <p className="text-body text-base-content/80">
                Uses --shadow-floating, --blur-medium, and --radius-2xl. This represents dialogs or
                elevated content.
              </p>
            </div>
          </div>
        </section>
      </ScreenBody>
    </Screen>
  );
}
