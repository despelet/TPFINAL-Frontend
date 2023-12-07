console.log(location.search) // lee los argumentos pasados a este formulario
var id = location.search.substring(4)
console.log(id)
const {
    createApp
} = Vue
createApp({
    data() {
        return {
            id: 0,
            tipo_producto: "",
            modelo: "",
            descripcion: "",
            proveedor: "",
            precio: 0,
            imagen: "",

            url: 'https://despelett.pythonanywhere.com/productos/' + id, //ruta pythonanywhere
            //url:'http://127.0.0.1:5000/productos/' + id, //ruta local
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id = data.id
                    this.tipo_producto = data.tipo_producto;
                    this.modelo = data.modelo
                    this.descripcion = data.descripcion
                    this.proveedor = data.proveedor
                    this.precio = data.precio
                    this.imagen = data.imagen
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },
        modificar() {
            let producto = {
                tipo_producto: this.tipo_producto,
                modelo: this.modelo,
                descripcion: this.descripcion,
                proveedor: this.proveedor,
                precio: this.precio,
                imagen: this.imagen
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function() {
                    alert("Registro modificado")
                    window.location.href = "./productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')