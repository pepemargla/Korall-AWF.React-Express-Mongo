
import  React,{ useState} from 'react'
import { Link } from 'react-router-dom'
import './productos.css'


const Products = () => {

    const [coasters, setCoasters] = useState([])

    const loadCoasters = () => {

        fetch('http://localhost:8080/api/coasters')
            .then(res => res.json())
            .then(allCoasters => setCoasters(allCoasters))

    }

    loadCoasters()

    return (
        <main>
            <h1>Listado de Productos</h1>
            <hr />
            {coasters.map(eachCoaster => {
                return (
                    <Link to={`/details/${eachCoaster._id}`} key={eachCoaster._id}>
                        <article className='coaster-card'>
                            <img src={eachCoaster.imageUrl}></img>
                            <h3>{eachCoaster.title}</h3>
                        </article>
                    </Link>
                )
            })}
            <Link to="/">Ir al inicio</Link>
        </main>
    )
}

export default Products