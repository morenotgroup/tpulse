import BottomNav from '@/components/BottomNav'
import FullCalendar from '@/components/FullCalendar'

export default function Page() {
  return (
    <>
      <header className="px-4 pt-5 pb-3">
        <h1 className="text-xl font-semibold">Calendário • Gente & Cultura</h1>
        <p className="text-sm text-[color:var(--muted)]">Setembro a Dezembro</p>
      </header>
      <section className="px-4 pb-24">
        <FullCalendar />
      </section>
      <BottomNav />
    </>
  )
}
