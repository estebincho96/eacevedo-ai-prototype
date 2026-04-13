import { Link } from 'react-router-dom'

const SKILLS = [
  'Data cleaning',
  'Data preparation',
  'Exploratory data analysis',
  'Code quality',
]

function LearnerHome() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--cds-color-grey-25)]">
      {/* Top nav */}
      <header className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between gap-24 px-24 py-16 bg-[var(--cds-color-white)] shadow-[var(--cds-elevation-level1)] border-b border-[var(--cds-color-neutral-stroke-primary-weak)]">
        <div className="flex items-center gap-12">
          <span className="text-[var(--cds-color-blue-700)]">
            <img
              src="/coursera-logo.svg"
              alt="Coursera"
              className="h-[18px] w-auto"
            />
          </span>
          <span className="cds-body-primary text-[var(--cds-color-grey-600)]">Google</span>
          <button
            type="button"
            aria-label="Open menu"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] text-[var(--cds-color-grey-975)] hover:bg-[var(--cds-color-grey-50)]"
          >
            <span className="material-symbols-rounded text-[20px]">menu</span>
          </button>
        </div>
        <div className="flex items-center gap-8">
          <button
            type="button"
            aria-label="Help"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-grey-50)]"
          >
            <span className="material-symbols-rounded text-[20px]">help</span>
          </button>
          <button
            type="button"
            aria-label="Chat"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-grey-50)]"
          >
            <span className="material-symbols-rounded text-[20px]">chat_bubble</span>
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-grey-50)]"
          >
            <span className="material-symbols-rounded text-[20px]">notifications</span>
          </button>
          <button
            type="button"
            aria-label="Profile"
            className="flex items-center justify-center w-36 h-36 rounded-full bg-[var(--cds-color-blue-700)] text-[var(--cds-color-white)] cds-body-primary"
          >
            N
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-24 flex justify-center items-start">
        <article className="w-full max-w-[900px] bg-[var(--cds-color-white)] rounded-[var(--cds-border-radius-200)] shadow-[var(--cds-elevation-level1)] overflow-hidden">
          {/* Card header: blue band + title + CTA + illustration */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-16 p-24 bg-[var(--cds-color-blue-25)]">
            <div className="min-w-0 flex-1">
              <p className="cds-body-secondary text-[var(--cds-color-grey-600)]">Graded Lab</p>
              <h1 className="cds-title-xs text-[var(--cds-color-grey-975)] mt-4">
                Exploring taxi rides in Chicago
              </h1>
              <Link
                to="/author"
                className="inline-flex items-center justify-center mt-16 px-24 py-12 rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-blue-700)] text-[var(--cds-color-white)] cds-action-primary hover:bg-[var(--cds-color-blue-800)]"
              >
                Start lab
              </Link>
            </div>
            <div className="flex-shrink-0 w-[200px] h-[140px] flex items-center justify-center">
              <img
                src="/coverpage-illu.png"
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Card body: scenario + skills | what to expect */}
          <div className="flex flex-col lg:flex-row lg:gap-32 p-24">
            <div className="flex-1 min-w-0 space-y-24">
              <section>
                <h2 className="cds-subtitle-md text-[var(--cds-color-grey-975)]">Scenario</h2>
                <p className="cds-body-primary text-[var(--cds-color-grey-975)] mt-8">
                  You are a data analyst on the Chicago mobility operations team. Your manager has
                  asked you to analyze taxi trip data to understand tipping patterns. You will
                  provide insights for a report on how the team can improve driver earnings and
                  passenger satisfaction.
                </p>
              </section>
              <section>
                <h2 className="cds-subtitle-md text-[var(--cds-color-grey-975)]">
                  Skills you&apos;ll be evaluated on
                </h2>
                <ul className="flex flex-wrap gap-8 mt-8" role="list">
                  {SKILLS.map((skill) => (
                    <li key={skill}>
                      <span className="inline-flex items-center py-4 px-12 rounded-[var(--cds-border-radius-400)] border border-[var(--cds-color-grey-100)] bg-[var(--cds-color-grey-50)] cds-body-secondary text-[var(--cds-color-grey-975)]">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <button
                type="button"
                className="flex items-center gap-4 cds-body-secondary text-[var(--cds-color-grey-600)] hover:text-[var(--cds-color-grey-900)]"
              >
                <span className="material-symbols-rounded text-[16px]">flag</span>
                Report an issue
              </button>
            </div>

            <div className="flex-shrink-0 lg:w-[280px] pt-24 lg:pt-0 lg:border-l border-[var(--cds-color-grey-100)] lg:pl-32">
              <h2 className="cds-subtitle-md text-[var(--cds-color-grey-975)]">
                What to expect
              </h2>
              <ul className="mt-16 space-y-12" role="list">
                <li className="flex items-center gap-12">
                  <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]">schedule</span>
                  <span className="cds-body-primary text-[var(--cds-color-grey-975)]">Due Feb 19, 2026</span>
                </li>
                <li className="flex items-center gap-12">
                  <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]">track_changes</span>
                  <span className="cds-body-primary text-[var(--cds-color-grey-975)]">3 attempts</span>
                </li>
                <li className="flex items-center gap-12">
                  <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]">schedule</span>
                  <span className="cds-body-primary text-[var(--cds-color-grey-975)]">60 min per attempt</span>
                </li>
                <li className="flex items-center gap-12">
                  <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]">auto_awesome</span>
                  <span className="cds-body-primary text-[var(--cds-color-grey-975)]">Graded by AI</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

export default LearnerHome
