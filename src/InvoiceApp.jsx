import { getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { useState } from "react";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";


export const InvoiceApp = () => {

    const { total, id, name, client, company, items: itemsInitial } = getInvoice();
    const [productValue, setProductValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');
    const [items, setItems] = useState(itemsInitial); 

    const [counter, setCounter] = useState(4);

    const onProductChange = ({ target }) => {
        
            setProductValue(target.value);
        
    }
    const onPriceChange = ({ target }) => {
        setPriceValue(target.value);
    }
    const onQuantityChange = ({ target }) => {
        setQuantityValue(target.value);
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();
        if(productValue.trim().length <= 1) return;
        if(priceValue.trim().length <= 1) {
            alert('Error el precio no es un número')
            return;
        }
        if(isNaN(priceValue.trim())) return;
        if(quantityValue.trim().length < 1 ) {
            alert('Error la cantidad debe ser mayor a cero')
            return;
        }
        if(isNaN(quantityValue.trim())) {
            alert('Error la cantidad no es un número')
            return;
        }
        setItems([...items, { 
            id: counter, 
            product: productValue.trim(), 
            price: +priceValue.trim(), 
            quantity: parseInt(quantityValue.trim(), 10)
        }]);
        setProductValue('');
        setPriceValue('');
        setQuantityValue('');
        setCounter(counter + 1);
    }

   return (
        <>
            <div className="container">
                <div className="card my-3">
            <div className="card-header">Ejemplo Factura</div>
            <div className="card-body">
            <InvoiceView id={ id } name={ name } />
            <div className="row my-3">
                <div className="col">
            <ClientView title="Datos del cliente" client={ client}/>
            </div>
            <div className="col">
            <CompanyView title="Datos de la empresa" company={company}/>
            </div>
</div>

            <ListItemsView title="Productos de la factura" items={ items }/>
            <TotalView total = { total }/>
            <form className="w-50" onSubmit={ onInvoiceItemsSubmit }>
                <input 
                type="text"
                name="product" 
                placeholder="Producto" 
                value={ productValue }
                className="form-control m-3" onChange={ onProductChange }/>
                <input 
                type="text"
                name="price" 
                placeholder="Precio" 
                value={ priceValue }
                className="form-control m-3" onChange={ onPriceChange }/>
                <input 
                type="text"
                name="quantity" 
                placeholder="Cantidad" 
                value={ quantityValue }
                className="form-control m-3" 
                onChange={ onQuantityChange }/>
                <button 
                    type="submit" 
                    className="btn btn-primary m-3">
                    Nuevo Item
                    </button>
            </form>
            </div>
            </div>
            </div>
        </>
    )
}