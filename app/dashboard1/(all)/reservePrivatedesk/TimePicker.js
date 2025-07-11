import React, { useState, useMemo, useEffect } from 'react';

const TimeSelector = ({ onTimeSelect, reservation, Datecalender, reset }) => {
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [rangeStart, setRangeStart] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  // Reset state when the reset prop changes
  useEffect(() => {
    setSelectedRanges([]);
    setRangeStart(null);
    setHoveredIndex(null);
    setStartIndex(0);
  }, [reset]);

  const today = new Date();
  let currentBarIndex;
  if (today.toDateString() === Datecalender.toDateString()) {
    const currentHour = today.getHours();
    const currentMinutes = today.getMinutes();
    currentBarIndex = currentHour < 8 ? 0 : (currentHour - 8) * 2 + (currentMinutes >= 30 ? 1 : 0);
  } else {
    currentBarIndex = 0;
  }

  // Create an array of hours from 8:00 to 23:00 (16 hours total)
  const hours = Array.from({ length: 16 }, (_, i) => `${i + 8}:00`);
  const visibleHours = hours.slice(startIndex, startIndex + 11);

  // Adjust startIndex if Datecalender is today, to focus on current time slot
  useEffect(() => {
    if (today.toDateString() === Datecalender.toDateString()) {
      const nowHourIndex = Math.floor(currentBarIndex / 2);
      const maxStartIndex = hours.length - 11;
      let newStartIndex = nowHourIndex;
      if (newStartIndex > maxStartIndex) newStartIndex = maxStartIndex;
      if (newStartIndex < 0) newStartIndex = 0;
      setStartIndex(newStartIndex);
    } else {
      setStartIndex(0);
    }
  }, [Datecalender]);

  // Helper to convert "HH:mm" time string to barIndex (starting at 8:00 = index 0)
  const getBarIndexFromTime = (timeStr) => {
    if (!timeStr) return null;
    const [hourStr, minStr] = timeStr.split(':');
    const hour = parseInt(hourStr, 10);
    const minutes = parseInt(minStr, 10);
    return (hour - 8) * 2 + (minutes >= 30 ? 1 : 0);
  };

  // Build array of reserved ranges from reservation for the selected date
  const reservedRanges = useMemo(() => {
    if (!Datecalender) return [];

    // Defensive check: ensure reservation is an array
    if (!Array.isArray(reservation)) return [];

    const selectedDateStr = Datecalender.toISOString().split('T')[0];

    return reservation
      .filter((r) => {
        if (!r.date) return false;
        const resDateStr = new Date(r.date).toISOString().split('T')[0];
        return resDateStr === selectedDateStr;
      })
      .map((r) => {
        const start = getBarIndexFromTime(r.check_in);
        const end = getBarIndexFromTime(r.check_out);
        if (start === null || end === null) return null;
        return [start, end];
      })
      .filter(Boolean);
  }, [reservation, Datecalender]);

  // Check if a barIndex is reserved
  const isReservedBarIndex = (barIndex) =>
    reservedRanges.some(([start, end]) => barIndex >= start && barIndex < end);

  // Check if barIndex is in user-selected range(s)
  const isWithinAnyRange = (barIndex) =>
    selectedRanges.some(([start, end]) =>
      barIndex >= Math.min(start, end) && barIndex <= Math.max(start, end)
    );

  // Check if barIndex is in current hover range
  const isInCurrentHoverRange = (barIndex) => {
    if (rangeStart === null || hoveredIndex === null) return false;
    return barIndex >= Math.min(rangeStart, hoveredIndex) && barIndex <= Math.max(rangeStart, hoveredIndex);
  };

  // Convert barIndex to "HH:mm" string
  const getTimeFromBarIndex = (barIndex) => {
    const totalMinutes = barIndex * 30;
    const hourOffset = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hour = 8 + hourOffset;
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Format duration like "1h 30 mins"
  const getDuration = (start, end) => {
    const diffInBlocks = Math.abs(end - start + 1);
    const diffMinutes = diffInBlocks * 30;
    if (diffMinutes >= 60) {
      const hrs = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      return mins === 0 ? `${hrs}h` : `${hrs}h ${mins} mins`;
    }
    return `${diffMinutes} mins`;
  };

  // Handle click on a slot
  const handleClick = (barIndex) => {
    if (barIndex < currentBarIndex || isReservedBarIndex(barIndex)) return;

    if (rangeStart === null) {
      setRangeStart(barIndex);
      setHoveredIndex(barIndex);
    } else {
      const durationBlocks = Math.abs(barIndex - rangeStart) + 1;
      if (durationBlocks < 2 || durationBlocks % 2 !== 0) return; // minimum 1 hour, in 30-min blocks

      const newRange = [rangeStart, barIndex];
      setSelectedRanges((prev) => [...prev, newRange]);
      setRangeStart(null);
      setHoveredIndex(null);

      if (onTimeSelect) {
        const start = Math.min(rangeStart, barIndex);
        const end = Math.max(rangeStart, barIndex) + 1; // end is exclusive
        onTimeSelect({ startTime: getTimeFromBarIndex(start), endTime: getTimeFromBarIndex(end) });
      }
    }
  };

  // Handle hover over a slot
  const handleHover = (barIndex) => {
    if (barIndex < currentBarIndex || rangeStart === null || isReservedBarIndex(barIndex)) return;
    setHoveredIndex(barIndex);
  };

  // Navigate left in the hours view
  const handlePrev = () => {
    if (startIndex > 0) setStartIndex((prev) => prev - 1);
  };

  // Navigate right in the hours view
  const handleNext = () => {
    if (startIndex < hours.length - 11) setStartIndex((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md relative overflow-visible">
      <button className="rounded-full border p-2 hover:bg-gray-100 transition" onClick={handlePrev}>
        ❮
      </button>
      <div className="flex space-x-6 relative">
        {visibleHours.map((hour, i) => {
          const hourIndex = startIndex + i;
          const baseBarIndex = hourIndex * 2;
          return (
            <div key={hour} className="flex flex-col items-center min-w-[40px] group relative overflow-visible">
              <span className="text-xs font-medium text-gray-800 mb-1">{hour}</span>
              <div className="flex flex-col items-center relative overflow-visible">
                <div className="flex gap-[2px] relative z-10">
                  {[0, 1].map((offset) => {
                    const barIndex = baseBarIndex + offset;
                    const isPast = barIndex < currentBarIndex;
                    const isReserved = isReservedBarIndex(barIndex);
                    const isDisabled = isPast || isReserved;
                    const isSelected = isWithinAnyRange(barIndex);
                    const isHovered = isInCurrentHoverRange(barIndex);

                    const baseClasses = 'w-[14px] h-8 rounded-md border transition-all duration-200 relative';
                    let colorClasses;

                    if (isDisabled) {
                      colorClasses =
                        'bg-[repeating-linear-gradient(-45deg,_#f9fafb_0px,_#f9fafb_5px,_#e5e7eb_5px,_#e5e7eb_10px)] border-gray-300 cursor-not-allowed';
                    } else if (isSelected) {
                      colorClasses = 'bg-[#07ebbd] border-[#07ebbd] cursor-pointer';
                    } else if (isHovered) {
                      colorClasses = 'bg-[#07ebbd] border-[#07ebbd] cursor-pointer';
                    } else {
                      colorClasses = 'bg-gray-100 border-gray-300 cursor-pointer';
                    }

                    const showTooltip =
                      !isDisabled &&
                      rangeStart !== null &&
                      hoveredIndex !== null &&
                      barIndex === Math.max(rangeStart, hoveredIndex);

                    return (
                      <div
                        key={offset}
                        className={`${baseClasses} ${colorClasses}`}
                        style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                        onClick={() => !isDisabled && handleClick(barIndex)}
                        onMouseEnter={() => !isDisabled && handleHover(barIndex)}
                      >
                        {showTooltip && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20 pointer-events-none">
                            {`${getTimeFromBarIndex(Math.min(rangeStart, hoveredIndex))} - ${getTimeFromBarIndex(
                              Math.max(rangeStart, hoveredIndex) + 1
                            )} (${getDuration(rangeStart, hoveredIndex)})`}
                            <div className="absolute left-1/2 -bottom-1 w-0 h-0 border-8 border-transparent border-t-gray-900 -translate-x-1/2"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Hour separation line */}
                {i < visibleHours.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 h-full border-r border-gray-300"
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="rounded-full border p-2 hover:bg-gray-100 transition" onClick={handleNext}>
        ❯
      </button>
    </div>
  );
};

export default TimeSelector;
