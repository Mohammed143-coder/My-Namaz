import CommonHeader from '@/components/CommonHeader'
import HijriCalendar from '@/components/HijriCalendar'

export const metadata = {
  title: 'Islamic Calendar | My Namaz',
  description: 'View the current Hijri date and important Islamic dates',
}

const CalendarPage = () => {
  return (
    <div className="min-h-screen pattern-bg p-4">
      <div className="max-w-2xl mx-auto">
        <CommonHeader>Islamic Calendar</CommonHeader>
        <div className="mt-6">
          <HijriCalendar />
        </div>
      </div>
    </div>
  )
}

export default CalendarPage
