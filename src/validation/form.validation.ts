import * as yup from 'yup';

const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}[A-Z\d]{3}$/;
const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;

export const informationValidationSchema = yup.object().shape({
    name: yup
        .string()
        .min(3, ({ min }) => `El nombre debe contener al menos ${min} caracteres`)
        .required('Nombre es requerido'),
    firstName: yup
        .string()
        .min(3, ({ min }) => `El primer apellido debe contener al menos ${min} caracteres`)
        .required('El primer apellido es requerido'),
    curp: yup
        .string()
        .min(18, ({ min }) => `El CURP debe contener ${min} characteres minimo`)
        .matches(curpRegex, 'Por favor ingresa un CURP valido')
        .required('CURP es requerido'),
    rfc: yup
        .string()
        .min(12, ({ min }) => `El RFC debe contener ${min} characteres minimo`)
        .matches(rfcRegex, 'Por favor ingresa un RFC valido')
        .required('RFC es requerido'),
    cp: yup
        .number()
        .required('Código postal requerido'),
    state: yup
        .string()
        .required('Estado requerido'),
    municipality: yup
        .string()
        .required('Municipio o delegacion requerida'),
    colony: yup
        .string()
        .required('Colonia requerido'),
    street: yup
        .string()
        .required('Calle requerida'),
    outerNumber:yup
        .string()
        .required('Numero exterior requerido')
})