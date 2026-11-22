import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function SchedulePage() {
  requireFeature("eventSchedule");

  return (
    <NotReadyGate
      feature="eventSchedule"
      title="Schedule"
      message="The weekend timetable is still being finalised and will be published closer to the convention."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Weekend Timetable"
          title="Schedule"
          description="The full event schedule for Borneo Anthro Hub."
        />
        <ComingSoon emoji="📅" message="Schedule coming soon — stay tuned." />
      </div>
    </NotReadyGate>
  );
}
