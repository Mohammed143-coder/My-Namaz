import CommonHeader from "@/components/CommonHeader";
import HijriCalendar from "@/components/HijriCalendar";
import IslamicMonthlyCalendar from "@/components/IslamicMonthlyCalendar";

export const metadata = {
  title: "Islamic Calendar | My Namaz",
  description: "View the current Hijri date and important Islamic dates",
};

const CalendarPage = () => {
  return (
    <div className="min-h-screen bg-white p-4 pb-24">
      <div className="max-w-6xl mx-auto">
        <CommonHeader>Islamic Calendar</CommonHeader>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Current Hijri Date Card */}
          <div className="lg:col-span-1">
            <HijriCalendar />
          </div>

          {/* Monthly Calendar */}
          <div className="lg:col-span-2">
            <IslamicMonthlyCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
