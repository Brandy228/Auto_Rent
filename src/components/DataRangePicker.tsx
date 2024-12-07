// DataRangePicker.tsx
import React, { useState, useEffect } from 'react';
//import { DateRange, RangeKeyDict } from 'react-date-range';
import { addDays, addYears, startOfDay, differenceInDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Car } from '../models/garage/vehicle/Car';
import { RentSpecs } from '../models/application/RentSpecs';
import {DateRange, RangeKeyDict} from 'react-date-range';

interface DataRangePickerProps {
  car: Car;
  onDateSelect: (startDate: Date, endDate: Date) => void;
}

const DataRangePicker = ({ car, onDateSelect }: DataRangePickerProps) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    if (car && car.rents && car.rents.length > 0) {
      const dates: Date[] = [];
      car.rents.forEach((rent) => {
        let currentDate = new Date(rent.rent_start);
        const endDate = new Date(rent.rent_end);
        
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
      });
      setDisabledDates(dates);
    } else {
      setDisabledDates([]);
    }
  }, [car]);

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelectionRange(ranges.selection);
    onDateSelect(ranges.selection.startDate, ranges.selection.endDate);
  };

  const minDate = startOfDay(new Date());
  const maxDate = addYears(new Date(), 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <DateRange
          ranges={[selectionRange]}
          onChange={handleSelect}
          minDate={minDate}
          maxDate={maxDate}
          preventSnapRefocus={true}
          months={3}
          direction="horizontal"
          rangeColors={['#3b82f6']}
          disabledDates={disabledDates}
        />
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
        <p className="text-lg font-semibold text-blue-800">
          Rent range: {differenceInDays(selectionRange.endDate, selectionRange.startDate) + 1} days
        </p>
      </div>
    </div>
  );
};
//TODO clear local storage dates
export default DataRangePicker;