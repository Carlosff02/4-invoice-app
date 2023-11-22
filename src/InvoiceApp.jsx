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
            <form className="w-50" onSubmit={ event => {
                event.preventDefault();

                setItems([...items, { 
                    id: 4, 
                    product: productValue, 
                    price: +priceValue, 
                    quantity: parseInt(quantityValue, 10)
                }]);
                setProductValue('');
                setPriceValue('');
                setQuantityValue('');
            }}>
                <input 
                type="text"
                name="product" 
                placeholder="Producto" 
                value={ productValue }
                className="form-control m-3" onChange={ event => {
                    setProductValue(event.target.value);
                }}/>
                <input 
                type="text"
                name="price" 
                placeholder="Precio" 
                value={ priceValue }
                className="form-control m-3" onChange={ event => {
                    setPriceValue(event.target.value);
                }}/>
                <input 
                type="text"
                name="quantity" 
                placeholder="Cantidad" 
                value={ quantityValue }
                className="form-control m-3" 
                onChange={ event => {
                    setQuantityValue(event.target.value);
                }}/>
                <button type="submit" className="btn btn-primary">Crear Item</button>
            </form>
            </div>
            </div>
            </div>
        </>
    )
}