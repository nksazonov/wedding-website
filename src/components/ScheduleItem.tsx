'use client';

interface ScheduleItemProps {
  time: string;
  activity: string;
}

export default function ScheduleItem({ time, activity }: ScheduleItemProps) {
  return (
    <div className="flex gap-6 mb-6">
      {/* Time Column - Fixed width for alignment */}
      <div className="w-20 flex-shrink-0">
        <span className="text-2xl text-gray-800 font-[Cormorant_Infant]">
          {time}
        </span>
      </div>
      
      {/* Activity Column - Flexible width */}
      <div className="flex-1">
        <p className="text-base text-gray-700 leading-relaxed font-[Inter]">
          {activity}
        </p>
      </div>
    </div>
  );
}