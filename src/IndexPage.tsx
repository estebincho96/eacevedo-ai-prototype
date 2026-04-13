import { Link } from 'react-router-dom'

function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-24 bg-[var(--cds-color-grey-25)] p-24">
      <h1 className="cds-title-xs text-[var(--cds-color-grey-975)]">CDS Prototype</h1>
      <p className="cds-body-primary text-[var(--cds-color-grey-600)] mb-8">
        Choose an experience to test:
      </p>
      <nav className="flex flex-col sm:flex-row items-center gap-16">
        <Link
          to="/author"
          className="px-24 py-12 rounded-[var(--cds-border-radius-100)] bg-[var(--cds-color-blue-700)] text-[var(--cds-color-white)] cds-action-primary hover:bg-[var(--cds-color-blue-800)]"
        >
          Author UX
        </Link>
        <Link
          to="/learner"
          className="px-24 py-12 rounded-[var(--cds-border-radius-100)] border border-[var(--cds-color-grey-400)] bg-[var(--cds-color-white)] text-[var(--cds-color-grey-975)] cds-action-primary hover:bg-[var(--cds-color-grey-50)] hover:border-[var(--cds-color-grey-400)]"
        >
          Learner UX
        </Link>
      </nav>
    </div>
  )
}

export default IndexPage
