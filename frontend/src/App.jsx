import React, { useEffect, useState } from 'react';

   function App() {
     const [data, setData] = useState(null);

     useEffect(() => {
       // Fetch data from the PHP backend
       fetch('http://localhost/backend/api.php?q=overview')
         .then((response) => response.json())
         .then((data) => setData(data));
     }, []);

     return (
       <div className="App">
         <h1>React + PHP Backend Example</h1>
         {data ? (
           <ul>
           {
             data.map(link =>
               <li key={link.id}>{link.name}</li> 
             )
           }
         </ul>
         ) : (
           <p>Loading...</p>
         )}
       </div>
     );
   }

   export default App;