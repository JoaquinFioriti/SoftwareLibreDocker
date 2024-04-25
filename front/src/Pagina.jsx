import { useEffect, useState } from 'react';

function Pagina() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [personas, setPersonas] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Agregar la nueva persona a la lista
    await agregarPersona(nombre,apellido)
    setPersonas([...personas, { nombre, apellido }]);
    setNombre('');
    setApellido('');
  };

  useEffect(()=>{
    // Renderizado inicial
    obtenerPersonas().
        then( (personas)=>{
             console.log(personas)
             const personasResponse = personas.map(persona => ({
                nombre: persona.nombre,
                apellido: persona.apellido
              }));
             
             console.log('pakee', personasResponse)
             setPersonas([...personasResponse]);
            }).
        catch( (error)=> {console.log(error)})
  },[])

    async function obtenerPersonas(){
        try {
            const response = await fetch('http://localhost:3000/personas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
            if (!response.ok) {
                throw new Error('Error obtener');
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }


    }

    async function agregarPersona(nombre, apellido) {
        try {
            const response = await fetch('http://localhost:3000/personas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, apellido }),
            });
            if (!response.ok) {
            throw new Error('Error al insertar persona');
            }
            const data = await response.json();
            console.log('Registro insertado:', data);
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

  return (
    <div className="container min-w-[100vw] min-h-[100vh] m-0 p-8 bg-gray-300 ">
      <form onSubmit={handleSubmit} className="mb-8  bg-blue-300 text-center m-8 rounded-md">
        <h1 className="text-2xl font-semibold pb-4 pt-4 w-[70%]">Formulario</h1>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 mr-4 font-bold pb-4">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="w-[50%]  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="apellido" className="flex flex-col justify-center items-center font-bold pb-4">Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
            className="w-[50%] border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 my-8 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Enviar</button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Lista de Personas</h2>
      <ul>
        {personas.map((persona, index) => (
          <li key={index} className="mb-2 font-semibold">
            - {persona.nombre} {persona.apellido}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagina;
