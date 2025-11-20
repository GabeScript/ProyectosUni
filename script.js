let inventario = [
    { id: 1, nombre: "Lapiz", cantidad: 8, precio: 9.99 },
    { id: 2, nombre: "Cuaderno", cantidad: 20, precio: 14.99 },
    { id: 3, nombre: "Borrador", cantidad: 35, precio: 4.99 },
    { id: 4, nombre: "Calculadora", cantidad: 10, precio: 49.99 }
];
let nextId = 5;

function actualizarTabla() {
    const tbody = document.getElementById("tablaInventario");
    tbody.innerHTML = "";

    if (inventario.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No hay productos en el inventario</td></tr>';
        return;
    }

    inventario.forEach(item => {
        const tr = document.createElement("tr");
        
        if (item.cantidad < 10) {
            tr.className = "low-stock";
        }

        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio.toFixed(2)}</td>
            <td>
                <div class="actions">
                    <button class="btn-icon btn-edit" onclick="editarItem(${item.id})" title="Editar">
                        <svg class="icon-edit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon btn-delete" onclick="eliminarItem(${item.id})" title="Eliminar">
                        <svg class="icon-delete" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    actualizarEstadisticas();
    verificarBajoStock();
}

function actualizarEstadisticas() {
    document.getElementById("totalProductos").textContent = inventario.length;
}

function verificarBajoStock() {
    const alertContainer = document.getElementById("alertContainer");
    const productosPocoStock = inventario.filter(item => item.cantidad < 10);

    if (productosPocoStock.length > 0) {
        const nombres = productosPocoStock.map(item => `${item.nombre} (${item.cantidad})`).join(", ");
        alertContainer.innerHTML = `
            <div class="alert">
                <div class="alert-title">⚠️ Advertencia de Bajo Stock</div>
                <div>Los siguientes productos tienen menos de 10 unidades: ${nombres}</div>
            </div>
        `;
    } else {
        alertContainer.innerHTML = "";
    }
}

function agregarItem() {
    const nombre = document.getElementById("nombreInput").value.trim();
    const cantidad = parseInt(document.getElementById("cantidadInput").value);
    const precio = parseFloat(document.getElementById("precioInput").value);

    if (!nombre) {
        alert("Por favor ingrese el nombre del producto");
        return;
    }

    if (isNaN(cantidad) || cantidad < 0) {
        alert("Por favor ingrese una cantidad válida");
        return;
    }

    if (isNaN(precio) || precio < 0) {
        alert("Por favor ingrese un precio válido");
        return;
    }

    const nuevoItem = {
        id: nextId++,
        nombre: nombre,
        cantidad: cantidad,
        precio: precio
    };

    inventario.push(nuevoItem);
    actualizarTabla();

    document.getElementById("nombreInput").value = "";
    document.getElementById("cantidadInput").value = "";
    document.getElementById("precioInput").value = "";
}

function eliminarItem(id) {
    if (confirm("¿Está seguro que desea eliminar este producto?")) {
        inventario = inventario.filter(item => item.id !== id);
        actualizarTabla();
    }
}

function editarItem(id) {
    const item = inventario.find(i => i.id === id);
    if (!item) return;

    const nuevoNombre = prompt("Nombre del producto:", item.nombre);
    if (nuevoNombre === null) return;

    const nuevaCantidad = prompt("Cantidad:", item.cantidad);
    if (nuevaCantidad === null) return;

    const nuevoPrecio = prompt("Precio:", item.precio);
    if (nuevoPrecio === null) return;

    if (!nuevoNombre.trim()) {
        alert("El nombre no puede estar vacío");
        return;
    }

    const cantidad = parseInt(nuevaCantidad);
    const precio = parseFloat(nuevoPrecio);

    if (isNaN(cantidad) || cantidad < 0) {
        alert("Cantidad inválida");
        return;
    }

    if (isNaN(precio) || precio < 0) {
        alert("Precio inválido");
        return;
    }

    item.nombre = nuevoNombre.trim();
    item.cantidad = cantidad;
    item.precio = precio;

    actualizarTabla();
}

actualizarTabla();