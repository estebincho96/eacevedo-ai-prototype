import { useState, useCallback, useEffect } from 'react'

const PREVIEW_WIDTH_MIN = 320
const PREVIEW_WIDTH_MAX = 1200
const PREVIEW_WIDTH_DEFAULT = 700

function RolePlayAuthorPage() {
  const [previewWidth, setPreviewWidth] = useState(PREVIEW_WIDTH_DEFAULT)
  const [isResizing, setIsResizing] = useState(false)

  const handleResizeMove = useCallback(
    (e: MouseEvent) => {
      const width = Math.min(
        PREVIEW_WIDTH_MAX,
        Math.max(PREVIEW_WIDTH_MIN, window.innerWidth - e.clientX)
      )
      setPreviewWidth(width)
    },
    []
  )

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false)
  }, [])

  useEffect(() => {
    if (!isResizing) return
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', handleResizeMove)
    window.addEventListener('mouseup', handleResizeEnd)
    return () => {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      window.removeEventListener('mousemove', handleResizeMove)
      window.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [isResizing, handleResizeMove, handleResizeEnd])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cds-color-grey-25)]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex-shrink-0 flex items-center justify-between gap-24 px-24 py-16 bg-[var(--cds-color-white)] border-b border-[var(--cds-color-neutral-stroke-primary-weak)]">
        <div className="min-w-0">
          <h1 className="cds-title-xs text-[var(--cds-color-grey-975)] truncate">
            Untitled
          </h1>
          <p className="cds-body-secondary text-[var(--cds-color-grey-600)] mt-4">
            Role Play • Original Version • Public session
          </p>
        </div>
        <div className="flex items-center gap-12 flex-shrink-0">
          <button
            type="button"
            aria-label="Previous"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-grey-975)] hover:bg-[var(--cds-color-grey-50)] hover:border-[var(--cds-color-grey-400)] duration-fast"
          >
            <span className="material-symbols-rounded text-[16px]">chevron_left</span>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-grey-975)] hover:bg-[var(--cds-color-grey-50)] duration-fast"
          >
            <span className="material-symbols-rounded text-[16px]">chevron_right</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-4 px-16 py-8 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-blue-800)] bg-[var(--cds-color-blue-25)] text-[var(--cds-color-blue-800)] cds-action-secondary hover:bg-[var(--cds-color-blue-50)] duration-fast"
          >
            Draft
            <span className="material-symbols-rounded text-[16px]">expand_more</span>
          </button>
          <button
            type="button"
            className="px-16 py-8 rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-blue-700)] text-[var(--cds-color-white)] cds-action-secondary hover:bg-[var(--cds-color-blue-800)] duration-fast"
          >
            Publish
          </button>
          <button
            type="button"
            className="px-16 py-8 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-blue-800)] cds-action-secondary hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] duration-fast"
          >
            View as Learner
          </button>
          <button
            type="button"
            aria-label="More options"
            className="flex items-center justify-center w-36 h-36 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-grey-975)] hover:bg-[var(--cds-color-grey-50)] duration-fast"
          >
            <span className="material-symbols-rounded text-[16px]">more_vert</span>
          </button>
          <button
            type="button"
            className="cds-action-secondary text-[var(--cds-color-grey-975)] hover:text-[var(--cds-color-grey-900)] duration-fast px-8 py-8"
          >
            Close
          </button>
        </div>
      </header>

      {/* Main: form + preview */}
      <main className="flex flex-1 min-h-0">
        {/* Left column: form */}
        <div className="flex-1 min-w-0 overflow-y-auto bg-[var(--cds-color-white)]">
          <div className="max-w-[720px] mx-auto p-24 min-h-full">
            {/* Role Play section */}
            <p className="cds-body-secondary text-[var(--cds-color-grey-600)]">
              Role Play
            </p>
            <h2 className="cds-title-xs text-[var(--cds-color-grey-975)] mt-4">
              Untitled
            </h2>

            {/* Create your activity */}
            <div className="mt-32">
              <div className="flex items-center justify-between gap-16 flex-wrap">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Create your activity <span className="text-[var(--cds-color-red-700)]">*</span>
                </label>
                <button
                  type="button"
                  className="px-16 py-8 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-blue-700)] cds-action-secondary hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] duration-fast"
                >
                  Use an example
                </button>
              </div>
              <p className="cds-body-secondary text-[var(--cds-color-grey-975)] mt-8">
                Create a scenario where learners practice a conversation with an AI persona. Define the scenario, tasks, and evaluation criteria to guide the experience.
              </p>
            </div>

            {/* Scenario definition */}
            <div className="mt-24">
              <div className="flex items-center gap-4 mb-8">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Scenario definition
                </label>
                <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]" aria-hidden>info</span>
              </div>
              <input
                type="text"
                placeholder="In this real-world scenario..."
                className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
              />
            </div>

            {/* Task 1 */}
            <div className="mt-24">
              <label className="block cds-body-primary text-[var(--cds-color-grey-975)] mb-8">
                Task 1
              </label>
              <input
                type="text"
                placeholder="The first task in this Role Play scenario involves..."
                className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
              />
            </div>

            {/* Task 2 */}
            <div className="mt-24">
              <label className="block cds-body-primary text-[var(--cds-color-grey-975)] mb-8">
                Task 2
              </label>
              <input
                type="text"
                placeholder="The second task in this Role Play scenario involves..."
                className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
              />
            </div>

            {/* Add task */}
            <button
              type="button"
              className="flex items-center gap-4 mt-16 cds-action-primary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast"
            >
              <span className="material-symbols-rounded text-[20px]">add</span>
              Add task
            </button>

            {/* Title of the AI Persona */}
            <div className="mt-32">
              <div className="flex items-center gap-4 mb-8">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Title of the AI Persona
                </label>
                <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]" aria-hidden>info</span>
              </div>
              <input
                type="text"
                placeholder="The title of the AI persona as it will appear in chat"
                className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
              />
            </div>

            {/* Overview for learners */}
            <div className="mt-32">
              <div className="flex items-center gap-4 mb-8">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Overview for learners
                </label>
                <span className="material-symbols-rounded text-[20px] text-[var(--cds-color-grey-600)]" aria-hidden>info</span>
              </div>
              <textarea
                rows={4}
                placeholder="Provide helpful details and direction for learners to reference during the Role Play"
                className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2 resize-y min-h-[120px]"
              />
              <p className="cds-body-secondary text-[var(--cds-color-grey-600)] mt-4">
                500 characters remaining
              </p>
            </div>

            {/* Evaluation criteria */}
            <div className="mt-32">
              <div className="flex items-center justify-between gap-16 flex-wrap mb-8">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Evaluation criteria <span className="text-[var(--cds-color-red-700)]">*</span>
                </label>
                <button
                  type="button"
                  className="cds-action-secondary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast flex items-center gap-4"
                >
                  Best practices
                  <span className="material-symbols-rounded text-[16px] text-[var(--cds-color-grey-600)]" aria-hidden>info</span>
                </button>
              </div>
              <p className="cds-body-secondary text-[var(--cds-color-grey-975)] mb-24">
                Define rubrics for how learner responses will be evaluated at each level.
              </p>
              <div className="space-y-24">
                <div>
                  <label className="block cds-subtitle-md text-[var(--cds-color-grey-975)] mb-8">
                    Advanced
                  </label>
                  <input
                    type="text"
                    placeholder="How would you identify a learner who excels?"
                    className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block cds-subtitle-md text-[var(--cds-color-grey-975)] mb-8">
                    Intermediate
                  </label>
                  <input
                    type="text"
                    placeholder="How would you identify a learner who performs well?"
                    className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block cds-subtitle-md text-[var(--cds-color-grey-975)] mb-8">
                    Beginner
                  </label>
                  <input
                    type="text"
                    placeholder="How would you identify a learner who needs development?"
                    className="w-full p-12 border border-[var(--cds-color-grey-400)] rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-white)] cds-body-primary text-[var(--cds-color-grey-975)] placeholder:text-[var(--cds-color-grey-600)] hover:bg-[var(--cds-color-blue-25)] hover:border-[var(--cds-color-blue-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cds-color-purple-700)] focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </div>

            {/* Provide additional context */}
            <div className="mt-32 pb-48">
              <div className="flex items-center justify-between gap-16 flex-wrap mb-8">
                <label className="cds-body-primary text-[var(--cds-color-grey-975)]">
                  Provide additional context
                </label>
                <button
                  type="button"
                  className="cds-action-secondary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast flex items-center gap-4"
                >
                  How it works
                  <span className="material-symbols-rounded text-[16px] text-[var(--cds-color-grey-600)]" aria-hidden>info</span>
                </button>
              </div>
              <p className="cds-body-secondary text-[var(--cds-color-grey-975)] mb-16">
                Add files to give the AI persona more information to draw from during the conversation.
              </p>
              <button
                type="button"
                className="flex items-center gap-4 cds-action-primary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast"
              >
                <span className="material-symbols-rounded text-[20px]">upload_file</span>
                Add files
              </button>
              <p className="cds-body-secondary text-[var(--cds-color-grey-600)] mt-4">
                Only .txt files are accepted.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: preview (resizable) */}
        <aside
          className="sticky top-[85px] self-start relative flex-shrink-0 flex flex-col h-[calc(100vh-85px)] bg-[var(--cds-color-white)] border-l border-[var(--cds-color-neutral-stroke-primary-weak)]"
          style={{ width: previewWidth }}
        >
          {/* Resize handle */}
          <button
            type="button"
            aria-label="Resize preview panel"
            className="absolute left-0 top-0 bottom-0 z-10 w-8 -translate-x-1/2 cursor-col-resize touch-none border-0 bg-transparent"
            onMouseDown={() => setIsResizing(true)}
          >
            <span className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full bg-[var(--cds-color-grey-200)] hover:bg-[var(--cds-color-grey-400)] active:bg-[var(--cds-color-blue-700)] transition-colors duration-fast" aria-hidden />
          </button>
          <div className="flex-shrink-0 flex items-center justify-between gap-16 p-24 border-b border-[var(--cds-color-neutral-stroke-primary-weak)]">
            <h2 className="cds-title-xs text-[var(--cds-color-grey-975)]">
              Preview
            </h2>
            <div className="flex items-center gap-12">
              <button
                type="button"
                className="cds-action-secondary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast"
              >
                View feedback
              </button>
              <button
                type="button"
                className="cds-action-secondary text-[var(--cds-color-blue-700)] hover:text-[var(--cds-color-blue-800)] duration-fast"
              >
                Reload
              </button>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex items-center justify-center p-48 overflow-hidden">
            <div className="flex flex-col items-center gap-16 text-center max-w-[280px]">
              <span
                className="material-symbols-rounded text-[48px] text-[var(--cds-color-grey-400)]"
                aria-hidden
              >
                touch_app
              </span>
              <p className="cds-body-primary text-[var(--cds-color-grey-600)]">
                Fill the information on the left to generate the activity preview.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default RolePlayAuthorPage
