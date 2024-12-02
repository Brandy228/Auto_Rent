// DataRangePicker.tsx
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, addYears, startOfDay, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import '../styles/globals.css';

type DateRangeType = {
  startDate: Date;
  endDate: Date;
};

const DataRangePicker = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges: any) => {
    setSelectionRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection',
    });
  };

  // Розрахунок кількості днів між датами
  const getDaysDifference = () => {
    // const diff = differenceInDays(selectionRange.endDate, selectionRange.startDate);
    // console.log(selectionRange,diff)
    // return diff + 1; // +1 тому що включаємо обидві дати
    const startDate = startOfDay(selectionRange.startDate);
    const endDate = startOfDay(selectionRange.endDate);
    const diff = differenceInDays(endDate, startDate) + 1; // +1 для включення кінцевої дати
    return diff;
  };

  const minDate = new Date();
  const maxDate = addYears(new Date(), 1);

  const disabledRanges: DateRangeType[] = [
    { startDate: addDays(new Date(), 5), endDate: addDays(new Date(), 10) },
    { startDate: addDays(new Date(), 15), endDate: addDays(new Date(), 20) },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <DateRange
          ranges={[selectionRange]}
          onChange={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          months={3}
          direction="horizontal"
          preventSnapRefocus={true}
          // locale={enUS}
          rangeColors={['#3b82f6']}
          disabledDates={disabledRanges.flatMap(range => {
            const dates: Date[] = [];
            let currDate: Date = new Date(range.startDate);
            while (currDate <= range.endDate) {
              dates.push(new Date(currDate));
              currDate = addDays(currDate, 1);
            }
            return dates;
          })}
        />
      </div>
      
      {/* Відображення кількості днів */}
      <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
        <p className="text-lg font-semibold text-blue-800">
          Rental period: {getDaysDifference()} days
        </p>
      </div>
    </div>
  );
};

export default DataRangePicker;