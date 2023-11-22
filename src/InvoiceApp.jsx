import { getInvoice } from "./services/getInvoice"
import { ClientView } from "./components/ClientView";
import { CompanyView } from "./components/CompanyView";
import { useState } from "react";
import { InvoiceView } from "./components/InvoiceView";
import { ListItemsView } from "./components/ListItemsView";
import { TotalView } from "./components/TotalView";


export const InvoiceApp = () => {

    const { total, id, name, client, company, items: itemsInitial } = getInvoice();
    const [invoiceItemsState, setInvoiceItemsState] = useState({
        product : '',
        price: '',
        quantity: '',
    });

    const { product, price, quantity } = invoiceItemsState;

    const [items, setItems] = useState(itemsInitial); 

    const [counter, setCounter] = useState(4);

    const onInputChange = ({ target: {name, value} }) => {
        
            setInvoiceItemsState({
                ...invoiceItemsState,
                [ name ]: value
            });
        
    }

    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();
        if(product.trim().length <= 1) return;
        if(price.trim().length <= 1) {
            alert('Error el precio no es un número')
            return;
        }
        if(isNaN(price.trim())) return;
        if(quantity.trim().length < 1 || quantity.trim()==0) {
            alert('Error la cantidad debe ser mayor a cero')
            return;
        }
        if(isNaN(quantity.trim())) {
            alert('Error la cantidad no es un número')
            return;
        }
        setItems([...items, { 
            id: counter, 
            product: product.trim(), 
            price: +price.trim(), 
            quantity: parseInt(quantity.trim(), 10)
        }]);
        setInvoiceItemsState({
            product : '',
            price: '',
            quantity: '',
        });
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
                value={ product }
                className="form-control m-3" onChange={ onInputChange }/>
                <input 
                type="text"
                name="price" 
                placeholder="Precio" 
                value={ price }
                className="form-control m-3" onChange={ onInputChange }/>
                <input 
                type="text"
                name="quantity" 
                placeholder="Cantidad" 
                value={ quantity }
                className="form-control m-3" 
                onChange={ onInputChange }/>
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