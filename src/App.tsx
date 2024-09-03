import './App.css'
import { Input } from './components'
import { Formik, FormikHelpers } from 'formik'
import { extractAlphanumeric, extractLetters, extractNumbers } from './helpers/functions'
import React, { useEffect } from 'react';
import { informationValidationSchema } from './validation/form.validation';
import useFetch from './hooks/useFetch';
import { Users } from './interfaces/users.interface';
import Table from './components/table/Table';
import usePost from './hooks/usePost';
import { FormValues } from './interfaces/form.interface';
import Loading from './components/loading/Loading';

function App() {

  const initialValues: FormValues = {
    name: '',
    firstName: '',
    middleName: '',
    curp: '',
    rfc: '',
    cp: '',
    street: '',
    outerNumber: '',
    interiorNumber: '',
    state: '',
    municipality: '',
    colony: ''
  }

  const { data, error, loading } = useFetch<Users[]>('https://jsonplaceholder.typicode.com/users');
  const { error: errorPost, loading: loadingPost, postData } = usePost('http://httpbin.org/post');

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    const body = {
      infoUsuario: {
        Nombre: values.name,
        PrimerNombre: values.firstName,
        SegundoNombre: values.middleName,
        CURP: values.curp,
        RFC: values.rfc,
      },
      Domicilio: {
        Calle: values.street,
        NumeroExterior: values.outerNumber,
        NumeroInterior: values.interiorNumber,
        CodigoPostal: values.cp,
        Estado: values.state,
        Municipio: values.municipality,
        Colonia: values.colony,
      },
    }
    await postData(body)
    alert(`Datos enviados correctamente`);
    resetForm()
  };

  
  useEffect(() => {
    if (loadingPost || loading) {
     <Loading/>
    }

    if (errorPost || error) {
      alert(`Error: ${errorPost || error}`);
    }

  }, [loadingPost, loading, errorPost, error]);

  return (
    <>
      <h2>Identificación</h2>
      <div style={{ width: '800px' }}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={informationValidationSchema}
        >
          {({ handleSubmit, errors, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <div className='fields-container' >
                <Input
                  value={values.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('name')(extractLetters(e.target.value))
                  }
                  placeholder='Nombre'
                  label='Nombre*'
                  name='name'
                  errors={errors}
                />
                <Input
                  value={values.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('firstName')(extractLetters(e.target.value))
                  }
                  placeholder='Primer apellido'
                  label='Primer apellido*'
                  name='firstName'
                  errors={errors}
                />
                <Input
                  value={values.middleName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('middleName')(extractLetters(e.target.value))
                  }
                  placeholder='Segundo apellido'
                  label='Segundo apellido'
                  name='middleName'
                  errors={errors}
                />
              </div>
              <div className='fields-container' >
                <Input
                  value={values.curp}
                  onChange={handleChange('curp')}
                  placeholder='CURP'
                  label='CURP*'
                  name='curp'
                  errors={errors}
                />
                <Input
                  value={values.rfc}
                  onChange={handleChange('rfc')}
                  placeholder='RFC (con homoclave)*'
                  label='RFC (con homoclave)*'
                  name='rfc'
                  errors={errors}
                />
              </div>
              <div className='fields-container' >
                <Input
                  styleDiv={{ width: '30%' }}
                  value={values.cp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('cp')(extractNumbers(e.target.value))
                  }
                  placeholder='Código postal'
                  label='Código postal*'
                  name='cp'
                  errors={errors}
                />
                <Input
                  value={values.street}
                  onChange={handleChange('street')}
                  placeholder='Calle'
                  label='Calle*'
                  name='street'
                  errors={errors}
                />
              </div>
              <div className='fields-container' >
                <Input
                  styleDiv={{ width: '50%' }}
                  value={values.outerNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('outerNumber')(extractNumbers(e.target.value))
                  }
                  placeholder='Numero exterior'
                  label='Numero exterior*'
                  name='outerNumber'
                  errors={errors}
                />
                <Input
                  styleDiv={{ width: '50%' }}
                  value={values.interiorNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('interiorNumber')(extractAlphanumeric(e.target.value))
                  }
                  placeholder='Numero interior'
                  label='Numero interior'
                  name='interiorNumber'
                  errors={errors}
                />
                <Input
                  value={values.state}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('state')(extractLetters(e.target.value))
                  }
                  placeholder='Estado'
                  label='Estado*'
                  name='state'
                  errors={errors}
                />
              </div>
              <div className='fields-container' >
                <Input
                  value={values.municipality}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('municipality')(extractLetters(e.target.value))
                  }
                  placeholder='Delegación / Municipio'
                  label='Delegación / Municipio*'
                  name='municipality'
                  errors={errors}
                />
                <Input
                  value={values.colony}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('colony')(extractLetters(e.target.value))
                  }
                  placeholder='Colonia'
                  label='Colonia*'
                  name='colony'
                  errors={errors}
                />
              </div>
            
              <button className='primaryBtn' type='submit'>Guardar</button>
             
            </form>
          )}
        </Formik>
        <Table data={data} />
        
      </div>

    </>
  );
}

export default App;
