/**
 * Created by Tester-Ali on 01-12-2016.
 */
import React from 'react'
import Localize from './Localize'
import * as RBT from 'react-bootstrap'
import { DateField, DatePicker } from 'react-date-picker'
import {convertTime} from 'helpers/formats'

export const parseErrors = errors => {
    const submitErrors = {};
    if (errors.details) {
        const {messages} = errors.details;
        Object.keys(messages).map(field => {
            submitErrors[field] = (Localize.t(messages[field][0]))
        });
    }
    if (Object.keys(submitErrors).length === 0) {
        submitErrors['_error'] = Localize.t(errors.message)
    }
    return submitErrors;
};

export const renderDateField = ({input, label, type, className, dateFormat, placeholder, meta: {touched, error, warning}}) => (
    <RBT.FormGroup validationState={touched && error ? 'error' : 'success'}>
        <DateField {...input}
                   dateFormat={dateFormat ? dateFormat : 'HH:mm DD/MM/YYYY'} locale="vi" className={`form-control ${className}`}
                   updateOnDateClick={true}
                   placeholder={placeholder}
                   onBlur={() => {
                       let time = convertTime(input.value);
                       input.onBlur(time);
                   }}
        >
            <DatePicker
                dateFormat={dateFormat ? dateFormat : 'HH:mm DD/MM/YYYY'}
                cancelButtonText="Hủy"
                okButtonText="Chọn"
                todayButton={false}
                clearButton={false}
            />
        </DateField>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </RBT.FormGroup>
);

export const renderTextArea = ({input, className, onChange, placeholder, rows, meta: {touched, error, warning}}) => (
    <RBT.FormGroup validationState={touched && error ? 'error' : 'success'}>
         <textarea {...input}
                   placeholder={placeholder}
                   rows={rows}
                   className={`form-control ${className}`}>
         </textarea>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </RBT.FormGroup>
);