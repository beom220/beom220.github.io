import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {useState} from "react";
import styled from "@emotion/styled";

export default function Calender() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const onChangeDate = (date: Date | null) => {
        setStartDate(date)
    }
    const minDate = new Date('2022-08-13');
    return (
        <DatePickerStyled>
            <ReactDatePicker
                selected={startDate}
                onChange={onChangeDate}
                minDate={minDate}
                inline
            >
            </ReactDatePicker>
        </DatePickerStyled>
    )
}

const DatePickerStyled = styled.div`

  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker{
    width: 100%;
    font-size:14px;
   } 
  .react-datepicker__month-container,
  .react-datepicker__header, 
  .react-datepicker__month{ width:100%; margin:0; display:flex; flex-direction:column; gap:12px}
  .react-datepicker__day-names,
  .react-datepicker__week{display:flex; justify-content:space-around;}
  
  
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range,
  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected{
    // background-color:red
  }
  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name{
    line-height:unset;
    margin:unset;
    padding:4px
  }
`;
